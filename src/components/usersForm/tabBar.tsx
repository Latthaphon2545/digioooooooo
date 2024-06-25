interface TabBarProps {
  Individual: JSX.Element;
  Group: JSX.Element;
}

export const TabBar = ({ Individual, Group }: TabBarProps) => {
  return (
    <div role="tablist" className="tabs tabs-bordered mx-5">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Individual"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content px-10 mt-3">
        {Individual}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Group"
      />
      <div role="tabpanel" className="tab-content px-10 mt-3">
        {Group}
      </div>
    </div>
  );
};
