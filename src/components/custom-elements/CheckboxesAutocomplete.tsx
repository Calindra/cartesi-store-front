import { TextField, Checkbox, Autocomplete } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
  { title: 'Tech 1', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 2', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 3', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 4', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 5', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 6', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 7', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 8', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 9', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 10', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 11', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 12', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 13', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 14', installer: "https://www.npmjs.com/package/react-router-dom" },
  { title: 'Tech 15', installer: "https://www.npmjs.com/package/react-router-dom" },
];

const CheckboxesAutocomplete = () => (
  <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={top100Films}
    disableCloseOnSelect
    getOptionLabel={(option) => option.title}
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
      <TextField {...params} size="small" placeholder="Favorites" aria-label="Favorites" />
    )}
  />
);

export default CheckboxesAutocomplete;
