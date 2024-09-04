import {
    Typography,
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import FeatherIcon from 'feather-icons-react';
import { Dependencie } from '../../models/dependencie';


interface ItemWithOptionalDeleteHandlerProps<T> {
    item: T;
    deleteHandler?: (id: number) => void; // Torne opcional se nem todos os componentes precisarem dele
}

interface DeletableItemListProps {
    items: Dependencie[];
    deleteHandler: (id: number) => void;
}

const DeletableItem = ({ item }: ItemWithOptionalDeleteHandlerProps<Dependencie>) => {
    return (
        <Box
            sx={{
                pl: 0,
            }}
        >
            <Box display="flex" alignItems="center">
                <Box
                    sx={{
                        mb: 2,
                        width: "90%"
                    }}
                >
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography variant="h6" fontWeight="400">
                        {item.description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}


const TrashComponent = ({ item, deleteHandler }: ItemWithOptionalDeleteHandlerProps<Dependencie>) => {
    const handleDelete = () => {
        if (deleteHandler) deleteHandler(item.id);
    };

    return (
        <Box>
            <Tooltip title="Delete" placement="top">
                <IconButton onClick={handleDelete}>
                    <FeatherIcon
                        icon="trash"
                        width="18"
                        height="18"
                        sx={{
                            color: (theme: Theme) => theme.palette.grey.A200,
                        }}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    )
}


const DeletableItemList = ({ items, deleteHandler }: DeletableItemListProps) => {
    return (
        <Box
            sx={{
                overflow: {
                    xs: 'auto',
                    sm: 'unset',
                },
                mt: 2,
            }}
        >
            <Box>
                {items.map((item: Dependencie) => (
                    <Box key={item.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #4c4c4c",
                            mb: 2
                        }}>
                        <DeletableItem item={item} />
                        <TrashComponent item={item} deleteHandler={() => deleteHandler(item.id)} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default DeletableItemList;
