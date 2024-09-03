import { TextField, Checkbox, Autocomplete } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeletableItemList from '../dashboards/DeletableItemList';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CheckboxesAutocompleteProps {
  list: any[]
  handleChange: any
}

const CheckboxesAutocomplete = ({ list, handleChange: change }: CheckboxesAutocompleteProps) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (event, newValue) => {
    console.log("event: ", event)
    console.log("value: ", newValue)
    setSelectedItems(newValue);
  };

  const handleDeleteItem = (id: number) => {
    // Remover o item dos selecionados
    console.log("Item selecionado: ", id)
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
        name: item.title, // Assumindo que o nome é o título
        description: item.description, // Adicione descrição se necessário
      }))}
        deleteItem={handleDeleteItem} />
    </>
  )
};

export default CheckboxesAutocomplete;
