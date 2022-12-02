import React from "react";
import MyInput from "./UI/input/MyInput";
// import MySelect from "./UI/select/MySelect";

const ProjectFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={e => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
        />
        {/* <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Сортировка"
          option={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
          ]}
        /> */}
      </div>
  );
};

export default ProjectFilter;