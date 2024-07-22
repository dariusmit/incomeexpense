import incomeTypes from "../data/types/incomeTypes";

interface Props {
  title: "Income" | "Expense";
  data: incomeTypes[];
  onDelete: (itemID: number) => void;
}

function DataList({ title, data, onDelete }: Props) {
  let titleColor = "";

  title === "Income"
    ? (titleColor = "text-green-500")
    : (titleColor = "text-red-500");

  return (
    <>
      <ul>
        <h1 className={"text-2xl " + titleColor + " font-bold mb-4"}>
          {title}
        </h1>
        <div className="max-w-[500px] h-[170px] overflow-y-scroll">
          {data.map((item) => (
            <div key={item.id} className="flex [&>li]:mr-4">
              <li>{item.id}</li>
              <li>{item.date}</li>
              <li>{item.description}</li>
              <li>{item.amount}</li>
              <li>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500"
                >
                  delete
                </button>
              </li>
            </div>
          ))}
          {data.length == 0 ? <p>No income records...</p> : null}
        </div>
      </ul>
    </>
  );
}

export default DataList;
