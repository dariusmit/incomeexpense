import { useState } from "react";

interface Props {
  title: "income" | "expense";
  onSubmit: (values: {
    date: string;
    description: string;
    amount: string;
  }) => void;
}

function InputNew({ title, onSubmit }: Props) {
  let titleColor = "";

  title === "income"
    ? (titleColor = "text-green-500")
    : (titleColor = "text-red-500");

  let [formInputValues, updateFormInputValues] = useState({
    date: "",
    description: "",
    amount: "",
  });

  let validationErrors = {
    dateErr: "",
    descErr: "",
    amountErr: "",
  };

  let [errorMessage, setErrorMessage] = useState(validationErrors);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formInputValues.date.trim()) {
      validationErrors.dateErr = "Date is required";
      setErrorMessage(validationErrors);
    }

    if (!formInputValues.description.trim()) {
      validationErrors.descErr = "Description is required";
      setErrorMessage(validationErrors);
    }

    if (!formInputValues.amount.trim()) {
      validationErrors.amountErr = "Amount is required";
      setErrorMessage(validationErrors);
    }

    if (
      validationErrors.dateErr == "" &&
      validationErrors.descErr == "" &&
      validationErrors.amountErr == ""
    ) {
      onSubmit(formInputValues);
      validationErrors.dateErr = "";
      validationErrors.descErr = "";
      validationErrors.amountErr = "";
      setErrorMessage(validationErrors);
    }
  }

  return (
    <>
      <h1 className={"text-2xl " + titleColor + " font-bold mb-4"}>
        Enter new {title} record
      </h1>
      <form
        className="flex flex-col [&>input]:mb-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <div>
            <p>Date</p>
            <input
              type="date"
              min="2000-01-01"
              max="2099-01-01"
              onChange={(e) => {
                updateFormInputValues({
                  ...formInputValues,
                  date: e.target.value,
                });
              }}
              className="bg-slate-200 h-[40px] mr-4"
            />
          </div>
          <div className="text-red-500 mt-[31px]">{errorMessage.dateErr}</div>
        </div>
        <div className="flex">
          <div>
            <p>Description</p>
            <input
              type="text"
              onChange={(e) =>
                updateFormInputValues({
                  ...formInputValues,
                  description: e.target.value,
                })
              }
              className="bg-slate-200 h-[40px] mr-4"
              maxLength={20}
            />
          </div>
          <div className="text-red-500 mt-[31px]">{errorMessage.descErr}</div>
        </div>
        <div className="flex">
          <div>
            <p>Amount</p>
            <input
              type="number"
              step="0.01"
              onChange={(e) =>
                updateFormInputValues({
                  ...formInputValues,
                  amount: e.target.value,
                })
              }
              className="bg-slate-200 h-[40px] mr-4"
            />
          </div>
          <div className="text-red-500 mt-[31px]">{errorMessage.amountErr}</div>
        </div>

        <button
          className="bg-green-500 p-2 mt-4 font-bold w-[226px]"
          type="submit"
          value="Submit"
        >
          Add New
        </button>
      </form>
    </>
  );
}

export default InputNew;
