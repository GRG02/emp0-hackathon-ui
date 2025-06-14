import { Button } from '@mui/material'

const BT = ({ text = 'Click Me', onClick, ...props }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                fontSize: '1.25rem',
                bgcolor: 'darkorange',
                color: 'white',
                '&:hover': {
                    bgcolor: 'orangered',
                },
            }}
            {...props}
        >
            {text}
        </Button>
    )
}

export default BT
