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
import CustomTextField from '../../components/custom-elements/CustomTextField';
import CustomRadio from '../../components/custom-elements/CustomRadio';
import CustomFormLabel from '../../components/custom-elements/CustomFormLabel';
import DependenciesFrame from './dependencies-frame/DependenciesFrame';
import useForm from '../../hooks/useForm';
import { Dependencie } from '../../models/dependencie';

const JS_DEPENDENCIES: Dependencie[] = [
    { id: 1, title: 'express', description: "Something that describe Tech 1" },
    { id: 2, title: 'axios', description: "Something that describe Tech 2" },
    { id: 3, title: 'cartesify', description: "Something that describe Tech 3" },
]

const TS_DEPENDENCIES: Dependencie[] = [
    { id: 4, title: 'express', description: "Something that describe Tech 4" },
    { id: 5, title: 'axios', description: "Something that describe Tech 5" },
    { id: 6, title: 'cartesify', description: "Something that describe Tech 6" },
    { id: 7, title: 'viem', description: "Something that describe Tech 7" },
]
type Libraries = {
    [key: string]: Dependencie[];
};
const libraries: Libraries = {
    "Javascript": JS_DEPENDENCIES,
    "Typescript": TS_DEPENDENCIES
}

const MarketPlace = () => {
    const [dependencies, setDependencies] = React.useState([] as Dependencie[]);
    const [dependenciesDescription, setDependenciesDescription] = React.useState([]);
    const [language, setLanguage] = React.useState("Javascript")
    const { values, setValue } = useForm({
        name: "",
        version: "",
        description: ""
    })

    const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onLoadDepenciesFromLanguage(event.target.value)
        setLanguage(event.target.value)
    };

    const onLoadDepenciesFromLanguage = (language: string) => {
        const choosedList: Dependencie[] = libraries[language]
        setDependencies(choosedList)
    }

    const handleClick = async () => {
        try {

            const dependenciesTitles = dependenciesDescription.map((dep: Dependencie) => dep.title);

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
                                        onChange={changeLanguage}
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
                                <DependenciesFrame list={dependencies} />
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

export default MarketPlace;
