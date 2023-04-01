import type { CategorizedData, Entry } from "../../types";
import s from "./style.module.scss";

function ProgressGridColumn({
  title,
  description,
  entries,
}: {
  title: string;
  description: string;
  entries: Entry[];
}) {
  const numberOfArm = entries.filter((e) => e.armVersion).length;
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <section>
      <h3>{title}</h3>
      <div className={s.progress}>
        <meter
          max={entries.length}
          value={numberOfArm}
        >{`${numberOfArm}/${entries.length}`}</meter>
        <p>{`${numberOfArm}/${entries.length}`}</p>
      </div>
      <p>{description}</p>
      <table className={s.entryList}>
        <tbody>
          {sortedEntries.map((e) => (
            <tr key={e.name}>
              <td className={e.armVersion ? s.true : ""}>
                <a href={e.link}>{e.name}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function ProgressGrid({ data }: { data: CategorizedData }) {
  return (
    <div className={s.grid}>
      <ProgressGridColumn
        entries={data.microsoft}
        title="Microsoft"
        description="Applications developed by Microsoft"
      />
      <ProgressGridColumn
        entries={data.applications}
        title="Applications"
        description="Applications developed by third-parties"
      />
      <ProgressGridColumn
        entries={data.development}
        title="Development"
        description="SDKs and other application development tools"
      />
    </div>
  );
}
