import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteSubject } from '@/services/subjectService';
import { Subject } from '@/types/subject';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/lib/reactQuery';
import { queryKeys, routes } from '@/constants';
import { useNavigate } from 'react-router-dom';

type SubjectsActionsProps = {
  subject: Subject;
};

const SubjectsActions = ({ subject }: SubjectsActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleting, setDeleting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      // TODO: add delete subject here
      await deleteSubject(subject.id);
      queryClient.invalidateQueries([queryKeys.SUBJECTS]);
      handleCloseMenu();
      enqueueSnackbar('Successfully subject deleted!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClickEdit = () => {
    navigate(`${routes.subjectsEdit}`.replace(':id', String(subject.id)));
    handleCloseMenu();
  };

  return (
    <div>
      <Button
        id="subjects-action-button"
        aria-controls={open ? 'subjects-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="subjects-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'subjects-action-button',
        }}
      >
        {subject.is_published ? (
          <MenuItem onClick={handleCloseMenu}>Unpublished</MenuItem>
        ) : (
          <MenuItem onClick={handleCloseMenu}>Publish</MenuItem>
        )}
        <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} disabled={deleting}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SubjectsActions;
