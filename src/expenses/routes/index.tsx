import { Button } from "@/components/ui/button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { Plus, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

export function Expenses() {
  const expenses = [
    {
      id: 1,
      category: "Food",
      amount: "$100",
      date: "12/12/2021",
    },
    {
      id: 2,
      category: "Transport",
      amount: "$50",
      date: "12/12/2021",
    },
    {
      id: 3,
      category: "Entertainment",
      amount: "$150",
      date: "12/12/2021",
    },
    {
      id: 4,
      category: "Health",
      amount: "$200",
      date: "12/12/2021",
    },
    {
      id: 5,
      category: "Education",
      amount: "$250",
      date: "12/12/2021",
    },
    {
      id: 6,
      category: "Shopping",
      amount: "$300",
      date: "12/12/2021",
    },
    {
      id: 7,
      category: "Others",
      amount: "$350",
      date: "12/12/2021",
    },
  ];
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Expenses</h1>
        <Button variant="secondary" className="ml-auto">
          <Plus className="h-4 w-4" />
          <Link to="/expenses/add">Add Expense</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Utensils />
                  {expense.category}
                </div>
              </TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default Expenses;
