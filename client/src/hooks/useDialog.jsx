import { useEffect, useRef, useState } from 'react';

const useDialog = () => {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef();
  useEffect(() => {
    if (open) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [open]);

  return { dialogRef, setOpen, open };
};

export { useDialog };
