import { Helmet } from "react-helmet";

import { useState, useEffect, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { eventGetAll, eventICalURL } from "../api/event";
import { Event } from "../api/types";
import { GenderBadges } from "../components/Badges";
import { ToastContext } from "../providers/ToastProvider";
import { GinParseErrors } from "../util/gin-errors";
import dayjs from "../util/dayjs";
import useToClipboard from "../util/to-clipboard.hooks";

// Media
const ClothesImage =
  "https://images.clothingloop.org/768x/nichon_zelfportret.jpg";
const CirclesFrame = "https://images.clothingloop.org/0x0/circles.png";

export default function EventDetails() {
  const { t, i18n } = useTranslation();
  const { addToastError } = useContext(ToastContext);
  const [event, setEvent] = useState<Event>();
  const [, , , addCopyAttributes] = useToClipboard();

  useEffect(() => {
    load();
  }, []);

  const datetime = useMemo(() => {
    if (!event) return "";

    return dayjs(event.date).format("LLL");
  }, [event, i18n.language]);

  async function load() {
    try {
      const eventUID = window.location.pathname.split("/").at(-1);

      await eventGetAll({
        latitude: 50.662085,
        longitude: 87.778691,
        radius: 30000,
      }).then((res) => {
        const _event = res.data;
        _event.forEach((e) => {
          if (e.uid == eventUID) setEvent(e);
        });
      });
    } catch (err: any) {
      console.error(err);
      addToastError(GinParseErrors(t, err), err.status);
    }
  }

  if (!event) {
    return (
      <div className="max-w-screen-sm mx-auto flex-grow flex flex-col justify-center items-center">
        <h1 className="font-serif text-secondary text-4xl font-bold my-10">
          {t("eventNotFound")}
        </h1>
        <div className="flex">
          <Link to="/" className="btn btn-primary mx-4">
            {t("home")}
          </Link>
          <Link to="/events" className="btn btn-primary mx-4">
            {t("events")}
          </Link>
        </div>
      </div>
    );
  } else {
    const icalURL = eventICalURL(event.uid);
    const icalFilename = `${event.name}.ics`;

    return (
      <>
        <Helmet>
          <title>The Clothing Loop | Event Details</title>
          <meta name="description" content="Event Details" />
        </Helmet>
        <main>
          <div className="bg-teal-light">
            <div className="max-w-screen-xl mx-auto py-6 px-6 md:px-20">
              <h1 className="font-serif font-bold text-secondary text-4xl md:text-6xl mb-6 px-0">
                {event.name}
              </h1>
              <a
                href={icalURL}
                download={icalFilename}
                className="btn btn-primary w-fit md:mt-6"
              >
                <span className="relative mr-4 rtl:mr-1 rtl:ml-3" aria-hidden>
                  <span className="inline-block feather feather-calendar relative transform scale-125"></span>
                  <span className="absolute -bottom-2 -right-2.5 transform scale-90 feather feather-download"></span>
                </span>
                {t("addToCalendar")}
              </a>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto pt-6 px-6 md:px-20">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="w-full md:w-3/5 md:-mt-20 mb-4 md:mb-0 ml-0 md:ml-12 lg:ml-20 rtl:ml-0 rtl:md:mr-12 rtl:lg:mr-20">
                <div className="relative">
                  <dl className="z-10 relative bg-white md:shadow-[2px_3px_3px_1px_rgba(66,66,66,0.2)] md:py-10 md:px-8">
                    <dt className="mb-2 font-bold font-sans text-xl text-teal">
                      {t("time") + ":"}
                    </dt>
                    <dd className="mb-1 ml-4">
                      <span className="mr-2 rtl:mr-0 rtl:ml-2 inline-block feather feather-clock"></span>
                      <span className="font-sans text-lg">{datetime}</span>
                    </dd>
                    {event.address ? (
                      <>
                        <dt className="mb-2 font-bold font-sans text-xl text-teal">
                          {t("location") + ":"}
                        </dt>
                        <dd className="mb-1 ml-4">
                          <span
                            className="mr-2 feather feather-map-pin"
                            aria-hidden
                          ></span>
                          <address
                            {...addCopyAttributes(
                              t,
                              event.address,
                              "text-lg inline"
                            )}
                          >
                            {event.address}
                          </address>
                        </dd>
                      </>
                    ) : null}
                    <dt className="mb-2 font-bold font-sans text-xl text-teal">
                      {t("categories") + ":"}
                    </dt>

                    <dd className="mb-1 ml-4 block">
                      {event.genders?.length
                        ? GenderBadges(t, event.genders)
                        : null}
                    </dd>
                    <dt className="mb-2 font-bold font-sans text-xl text-teal">
                      {t("contactHost") + ":"}
                    </dt>
                    <dd className="mr-2 mb-1 ml-4">
                      <div>
                        <span
                          className="mr-2 rtl:mr-0 rtl:ml-2 inline-block feather feather-mail"
                          aria-hidden
                        ></span>
                        <span
                          {...addCopyAttributes(
                            t,
                            event.user_email,
                            "text-lg inline break-all"
                          )}
                        >
                          {event.user_email}
                        </span>
                      </div>
                      <div>
                        <span
                          className="mr-2 rtl:mr-0 rtl:ml-2 inline-block feather feather-phone"
                          aria-hidden
                        ></span>
                        <span
                          {...addCopyAttributes(
                            t,
                            event.user_phone,
                            "text-lg inline break-all"
                          )}
                        >
                          {event.user_phone}
                        </span>
                      </div>
                    </dd>
                    <dd className="mb-1 ml-4"></dd>
                  </dl>

                  <img
                    src={CirclesFrame}
                    aria-hidden
                    className="absolute -bottom-10  ltr:-right-10 rtl:-left-10 hidden md:block"
                  />
                </div>
              </div>
              <div className="w-full">
                <h2 className="font-sans font-bold text-secondary text-2xl mb-4 px-0">
                  {t("eventDetails") + ":"}
                </h2>
                <div className="w-full sm:float-right sm:w-64 relative mb-4 sm:m-4 mr-0">
                  <img
                    src={ClothesImage}
                    alt=""
                    className="aspect-[4/3] object-cover object-center relative z-10"
                  />
                </div>
                {event.description}
                Aut inventore sed aut autem qui. Harum unde ipsam eius. Est id
                rerum consequatur ab. Ea rerum ipsum voluptatibus sint adipisci.
                Fugiat recusandae quae voluptate sequi animi vitae nulla
                eveniet. Aut debitis temporibus minus iusto. Temporibus ipsam
                sed dolorum dolor vel placeat deleniti molestiae. Blanditiis qui
                id itaque tenetur enim enim earum et. Exercitationem sed quo aut
                ea et officia nihil quo. Cupiditate consequatur placeat ut. Et
                ut eaque qui aut qui voluptas. Cumque illum officiis autem.
                Eveniet id nesciunt et assumenda. Quia et ut aut esse voluptatem
                tempora unde. Quis aperiam doloremque ullam totam. Magni earum
                quo quae quam sit et est. Et sit rerum non suscipit rem
                recusandae eos. Illo animi nihil maiores maiores. Reiciendis quo
                assumenda repellat deleniti necessitatibus quas vel laudantium.
                Ut est amet voluptatem eum nihil et. Dignissimos reprehenderit
                atque est libero soluta repudiandae. Libero nesciunt corrupti
                aut atque illum.
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
