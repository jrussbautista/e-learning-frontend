import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteSubject } from '@/services/subjectService';
import { Subject } from '@/types/subject';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/lib/reactQuery';
import { queryKeys } from '@/constants';

type SubjectsActionsProps = {
  subject: Subject;
};

const SubjectsActions = ({ subject }: SubjectsActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleting, setDeleting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      // TODO: add delete subject here
      await deleteSubject(subject.id);
      queryClient.invalidateQueries([queryKeys.SUBJECTS]);
      handleClose();
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

  return (
    <div>
      <Button
        id="subjects-action-button"
        aria-controls={open ? 'subjects-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="subjects-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'subjects-action-button',
        }}
      >
        {subject.isPublished ? (
          <MenuItem onClick={handleClose}>Unpublished</MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>Publish</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} disabled={deleting}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SubjectsActions;
