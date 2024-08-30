import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    FormControlLabel,
    Button,
    Grid,
    RadioGroup,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import CustomTextField from '../components/custom-elements/CustomTextField';
import CustomRadio from '../components/custom-elements/CustomRadio';
import CustomFormLabel from '../components/custom-elements/CustomFormLabel';
import CheckboxesAutocomplete from '../components/custom-elements/CheckboxesAutocomplete';

const dependencies = [
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

const FbDefaultForm = () => {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [value, setValue] = React.useState('');

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const [number, setNumber] = React.useState('');

    const handleChange3 = (event: SelectChangeEvent<string>) => {
        setNumber(event.target.value);
    };

    return (
        <div>
            <Box
                sx={{
                    padding: '15px 30px',
                }}
                display="flex"
                alignItems="center"
            >
                <Box flexGrow={1}>
                    <Typography fontWeight="500" variant="h1">
                        Cartesi Marketplace
                    </Typography>
                </Box>
            </Box>
            <Card>
                <CardContent>
                    <form>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                mb: 2,
                                mt: 2,
                            }}
                        >
                            <Grid item lg={6} md={12} sm={12}>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    sx={{
                                        fontSize: 'h3.fontSize',
                                    }}
                                >
                                    Project Metadata
                                </Typography>
                                <CustomFormLabel
                                    htmlFor="name-value"
                                >
                                    Name
                                </CustomFormLabel>
                                <CustomTextField
                                    id="name-value"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />

                                <CustomFormLabel htmlFor="version-value">Version</CustomFormLabel>
                                <CustomTextField
                                    id="version-value"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />

                                <CustomFormLabel htmlFor="derscription-value">Description</CustomFormLabel>

                                <CustomTextField
                                    id="derscription-value"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    sx={{
                                        fontSize: 'h3.fontSize',
                                        mt: 4,
                                        mb: 3
                                    }}
                                >
                                    Languages
                                </Typography>

                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        value={value}
                                        onChange={handleChange2}
                                    >
                                        <FormControlLabel
                                            value="radio1"
                                            control={<CustomRadio />}
                                            label="JavaScript"
                                        />
                                        <FormControlLabel
                                            value="radio2"
                                            control={<CustomRadio />}
                                            label="TypeScript"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={12} sm={12}>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    sx={{
                                        fontSize: 'h3.fontSize',
                                        mb: 5
                                    }}
                                >
                                    Dependencies
                                </Typography>
                                <CheckboxesAutocomplete list={dependencies}/>
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button color="primary" variant="contained">
                                Generate
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FbDefaultForm;
