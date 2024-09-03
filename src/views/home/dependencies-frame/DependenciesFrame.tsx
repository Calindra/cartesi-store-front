import { TextField, Checkbox, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeletableItemList from '../../../components/dashboards/DeletableItemList';
import { useState } from 'react';
import { Dependencie } from '../../../models/dependencie';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface DependenciesFrameProps {
  list: Dependencie[]
}

const DependenciesFrame = ({ list }: DependenciesFrameProps) => {
  const [selectedItems, setSelectedItems] = useState<Dependencie[]>([]);

  const updateDependencieList = (_: React.SyntheticEvent, updatedDependencieList: Dependencie[]) => {
    setSelectedItems(updatedDependencieList);
  };

  const handleDeleteItem = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item: Dependencie) => item.id !== id)
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
        onChange={updateDependencieList}
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
      <DeletableItemList items={selectedItems}
        deleteHandler={handleDeleteItem} />
    </>
  )
};

export default DependenciesFrame;
