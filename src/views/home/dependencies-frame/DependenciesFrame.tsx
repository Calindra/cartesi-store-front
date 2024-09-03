import { TextField, Checkbox, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeletableItemList from '../../../components/dashboards/DeletableItemList';
import { Dependencie } from '../../../models/dependencie';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface DependenciesFrameProps {
  list: Dependencie[]
  selectedItems: Dependencie[]
  setSelectedItems: (items: Dependencie[]) => void;

}

const DependenciesFrame = ({ list, selectedItems, setSelectedItems }: DependenciesFrameProps) => {
  const updateDependencieList = (_: React.SyntheticEvent, updatedDependencieList: Dependencie[]) => {
    setSelectedItems(updatedDependencieList);
  };

  const handleDeleteItem = (id: number) => {
    const list = selectedItems.filter(item => item.id !== id)
    setSelectedItems(list);
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
