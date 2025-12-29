import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface LeaveBalanceProps {
  leaveType: string
  yearlyLeave: number
  taken: number
  balance: number
}

export function LeaveBalancePanel({ leaves }: { leaves: LeaveBalanceProps[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leave Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>LeaveType</TableHead>
                <TableHead>Yearly Leave</TableHead>
                <TableHead>Taken</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{leave.yearlyLeave}</TableCell>
                  <TableCell>{leave.taken.toFixed(2)}</TableCell>
                  <TableCell>{leave.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
