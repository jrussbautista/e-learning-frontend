import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Subject } from '@/types/subject';
import SubjectsActions from './SubjectsActions';

type SubjectsTableProps = {
  subjects: Subject[];
};

const SubjectsTable = ({ subjects }: SubjectsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow
              key={subject.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {subject.title}
              </TableCell>
              <TableCell align="right">{subject.description}</TableCell>
              <TableCell align="right">
                {subject.is_published ? 'Published' : 'Draft'}
              </TableCell>
              <TableCell align="right">
                <SubjectsActions isPublished={subject.is_published} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectsTable;
