import { TextField, Checkbox, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeletableItemList from '../../../components/dashboards/DeletableItemList';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface DependenciesFrameProps {
  list: any[]
}

const DependenciesFrame = ({ list }: DependenciesFrameProps) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (event, newValue) => {
    setSelectedItems(newValue);
  };

  const handleDeleteItem = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item: any) => item.id !== id)
    );
  };

  return (
    <>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={list}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        onChange={handleChange}
        value={selectedItems}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        fullWidth
        renderInput={(params) => {
          return (<TextField {...params} size="small" aria-label="Favorites" />)
        }}
      />
      <DeletableItemList items={selectedItems.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.description,
      }))}
        deleteItem={handleDeleteItem} />
    </>
  )
};

export default DependenciesFrame;
