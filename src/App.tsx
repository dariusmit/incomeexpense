import InputNew from "./components/InputNew";
import DataList from "./components/DataList";
import useFunctions from "./hooks/useFunctions";

function App() {
  const {
    incomeData,
    expenseData,
    initialIncomeTotal,
    initialExpenseTotal,
    addIncome,
    addExpense,
    handleIncomeDelete,
    handleExpenseDelete,
  } = useFunctions();

  return (
    <>
      <div className="text-xl m-16">
        <h1 className="text-4xl font-bold mb-12 mt-4 italic">
          INCOME / EXPENSE APP
        </h1>
        <div className="flex w-[80%]">
          <div className="flex flex-col w-[50%]">
            <div className="mb-8">
              <DataList
                title="Income"
                data={incomeData}
                onDelete={handleIncomeDelete}
              />
            </div>
            <div className="mb-8">
              <h1 className="text-2xl text-green-500 font-bold mb-4">
                Total income
              </h1>
              <div>{Math.round(Number(initialIncomeTotal))}</div>
            </div>
            <div>
              <InputNew title="income" onSubmit={addIncome} />
            </div>
          </div>
          <div className="flex flex-col w-[50%]">
            <div className="mb-8">
              <DataList
                title="Expense"
                data={expenseData}
                onDelete={handleExpenseDelete}
              />
            </div>
            <div className="mb-8">
              <h1 className="text-2xl text-red-500 font-bold mb-4">
                Total expense
              </h1>
              <div>{Math.round(Number(initialExpenseTotal))}</div>
            </div>
            <div>
              <InputNew title="expense" onSubmit={addExpense} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
