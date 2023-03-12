import { FormEvent, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useForm from "../util/form.hooks";
import CategoriesDropdown from "../components/CategoriesDropdown";
import DistanceDropdown from "../components/DistanceDropdown";
import WhenDropdown from "../components/WhenDropdown";

export interface SearchValues {
  genders: string[];
  date: string[];
  distance: string[];
}

interface Props {
  initialValues?: SearchValues;
  onSearch: (search: SearchValues) => void;
}

  
export default function EventsFilterBar(props: Props) {
  const { t } = useTranslation();

  const [values, setValue] = useForm<SearchValues>({
    genders: [] as string[],
    distance: [] as string[],
    date: [] as string[],
    //longitude: "",
    // latitude: "",
    ...props.initialValues,
  });
  const [events, setEvents] = useState<Event[]>();
  let refSubmit = useRef<any>();
  const urlParams = new URLSearchParams(location.search);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const history = useHistory();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onSearch(values);
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mb-8">
        <CategoriesDropdown
          className="w-[150px] md:w-[170px] mr-4 md:mr-8"
          selectedGenders={values.genders}
          handleChange={(gs) => setValue("genders", gs)}
        />
        <WhenDropdown
          className="w-[150px] md:w-[170px] mr-4 md:mr-8"
          selectedDate={values.date}
          handleChange={(date) => setValue("date", date)}
        />
        <DistanceDropdown
          className="w-[150px] md:w-[170px] mr-4 md:mr-8"
          selectedDistance={values.distance}
          handleChange={(d) => setValue("distance", d)}
        />
      </div>
      <button type="submit" className="grow btn btn-primary" ref={refSubmit}>
        <span className="hidden sm:inline">{t("search")}</span>
        <span className="sm:hidden inline feather feather-search"></span>
      </button>
    </form>
  );
}
