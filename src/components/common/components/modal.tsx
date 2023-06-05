import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../styles/modal.styles.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

type Props = {
    open: boolean;
    setOpen: (data: boolean) => void;
    children: React.ReactNode;
}

const BasicModal: React.FC< Props> = ({ children, open, setOpen }) =>{

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal