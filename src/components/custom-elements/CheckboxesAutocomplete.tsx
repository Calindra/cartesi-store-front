import { TextField, Checkbox, Autocomplete } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CheckboxesAutocompleteProps {
  list: any[]
  handleChange: any
}

const CheckboxesAutocomplete = ({ list, handleChange: change }: CheckboxesAutocompleteProps) => (
  <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={list}
    disableCloseOnSelect
    getOptionLabel={(option) => option.title}
    onChange={change}
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
    renderInput={(params) => (
      <TextField {...params} size="small" aria-label="Favorites" />
    )}
  />
);

export default CheckboxesAutocomplete;
