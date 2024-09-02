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
import DependenciesTable from '../components/dashboards/DependenciesTable';

const libraries: any = {
    "Javascript": [
        { title: 'express', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 1" },
        { title: 'axios', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 2" },
        { title: 'cartesify', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 3" },
    ],
    "Typescript": [
        { title: 'express', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 1" },
        { title: 'axios', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 2" },
        { title: 'cartesify', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 3" },
        { title: 'viem', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 3" },
    ]
}

const FbDefaultForm = () => {
    const [dependencies, setDependencies] = React.useState([]);
    const [dependenciesDescription, setDependenciesDescription] = React.useState([]);
    const [language, setLanguage] = React.useState("Javascript")
    const { values, setValue } = useForm({
        name: "",
        version: "",
        description: ""
    })

    const handleChange = (event: React.ChangeEvent<{}>, values: any[]) => {
        setDependenciesDescription(values as any)
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDependencies(libraries[event.target.value])
        setLanguage(event.target.value)
    };

    const handleClick = async () => {
        try {

            const dependenciesTitles = dependenciesDescription.map((dep: any) => dep.title);

            const response = await fetch('http://localhost:8080/download-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, name: values.name, version: values.version, description: values.description, dependencies: dependenciesTitles }),
            });

            if (!response.ok) {
                throw new Error('Erro ao baixar o template');
            }

            // Converter a resposta em blob
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${values.name}.zip`;
            link.click();
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao baixar o template');
        }
    }

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
                                            value="Javascript"
                                            control={<CustomRadio checked={language === 'Javascript'} />}
                                            label="Javascript"
                                        />
                                        <FormControlLabel
                                            value="Typescript"
                                            control={<CustomRadio checked={language === 'Typescript'} />}
                                            label="Typescript"
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
                                <CheckboxesAutocomplete list={dependencies} handleChange={handleChange} />
                                <DependenciesTable />
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button color="primary" variant="contained" onClick={handleClick}>
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
