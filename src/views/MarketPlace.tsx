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
} from '@mui/material';
import CustomTextField from '../components/custom-elements/CustomTextField';
import CustomRadio from '../components/custom-elements/CustomRadio';
import CustomFormLabel from '../components/custom-elements/CustomFormLabel';
import CheckboxesAutocomplete from '../components/custom-elements/CheckboxesAutocomplete';
import useForm from '../hooks/useForm';

const libraries: any = {
    "javascript": [
        { title: 'Tech 1', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 1" },
        { title: 'Tech 2', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 2" },
        { title: 'Tech 3', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 3" },
        { title: 'Tech 4', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 4" },
        { title: 'Tech 5', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 5" },
        { title: 'Tech 6', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 6" },
        { title: 'Tech 7', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 7" },
    ],
    "typescript": [
        { title: 'Tech 8', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 8" },
        { title: 'Tech 9', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 9" },
        { title: 'Tech 10', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 10" },
        { title: 'Tech 11', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 11" },
        { title: 'Tech 12', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 12" },
        { title: 'Tech 13', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 13" },
        { title: 'Tech 14', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 14" },
        { title: 'Tech 15', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 15" },
    ]
}

const FbDefaultForm = () => {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });
    const [dependencies, setDependencies] = React.useState([]);
    const { values, setValue } = useForm({
        name: "",
        version: "",
        description: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDependencies(libraries[event.target.value])
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
                                    value={values.name}
                                    name="name"
                                    onChange={e => setValue(e)}
                                />

                                <CustomFormLabel htmlFor="version-value">Version</CustomFormLabel>
                                <CustomTextField
                                    id="version-value"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={values.version}
                                    name="version"
                                    onChange={e => setValue(e)}
                                />

                                <CustomFormLabel htmlFor="derscription-value">Description</CustomFormLabel>

                                <CustomTextField
                                    id="derscription-value"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={values.description}
                                    name="description"
                                    onChange={e => setValue(e)}
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
                                        onChange={handleChange2}
                                    >
                                        <FormControlLabel
                                            value="javascript"
                                            control={<CustomRadio />}
                                            label="JavaScript"
                                        />
                                        <FormControlLabel
                                            value="typescript"
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
                                <CheckboxesAutocomplete list={dependencies} />
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
