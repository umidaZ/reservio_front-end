import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  TableContainer,
} from "@chakra-ui/react";

interface TransactionData {
  transactionId: string;
  orderId: string;
  date: string;
  detail: string;
  amount: string;
}

// Example data - replace with your actual data
const transactions: TransactionData[] = [
  {
    transactionId: "T001",
    orderId: "O1001",
    date: "2023-03-15",
    detail: "Product 1",
    amount: "$100",
  },
  {
    transactionId: "TXN123456",
    orderId: "ORD123456",
    date: "2024-03-20",
    detail: "Product A",
    amount: "$120.00",
  },
  {
    transactionId: "TXN123457",
    orderId: "ORD123457",
    date: "2024-03-21",
    detail: "Product B",
    amount: "$150.00",
  },
  {
    transactionId: "TXN123458",
    orderId: "ORD123458",
    date: "2024-03-22",
    detail: "Product C",
    amount: "$180.00",
  },
  // Add more transactions as needed
];

const TransactionsTable: React.FC = () => {
  return (
    <Box overflowX='auto'>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>TRANSACTION ID</Th>
              <Th>ORDER ID</Th>
              <Th>DATE</Th>
              <Th>DETAIL</Th>
              <Th isNumeric>AMOUNT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.transactionId}</Td>
                <Td>{transaction.orderId}</Td>
                <Td>{transaction.date}</Td>
                <Td>{transaction.detail}</Td>
                <Td isNumeric>{transaction.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionsTable;
