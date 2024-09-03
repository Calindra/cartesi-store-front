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
import DeletableItemList from '../components/dashboards/DeletableItemList';

const libraries: any = {
    "Javascript": [
        { id: 1, title: 'express', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 1" },
        { id: 2, title: 'axios', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 2" },
        { id: 3, title: 'cartesify', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 3" },
    ],
    "Typescript": [
        { id: 4, title: 'express', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 4" },
        { id: 5, title: 'axios', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 5" },
        { id: 6, title: 'cartesify', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 6" },
        { id: 7, title: 'viem', installer: "https://www.npmjs.com/package/react-router-dom", description: "Something that describe Tech 7" },
    ]
}

const items = [
    {
        id: 1,
        name: 'Axios',
        description: 'Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.',
    },
    {
        id: 2,
        name: 'Viem',
        description: 'viem is a TypeScript interface for Ethereum that provides low-level stateless primitives for interacting with Ethereum. viem is focused on developer experience, stability, bundle size, and performance',
    },
    {
        id: 3,
        name: 'Cartesify',
        description: 'Cartesify is a Sunodo template for Typescript Cartesi DApps. It uses node to execute the backend application.',
    },
    {
        id: 4,
        name: 'Express',
        description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    }
];

const FbDefaultForm = () => {
    const [dependencies, setDependencies] = React.useState([]);
    const [userDefinedDependencies, setUserDefinedDependencies] = React.useState([]);

    const [dependenciesDescription, setDependenciesDescription] = React.useState([]);
    const [language, setLanguage] = React.useState("Javascript")
    const [products, setProducts] = React.useState(items);
    const { values, setValue } = useForm({
        name: "",
        version: "",
        description: ""
    })

    const addDependencieToList = (event: React.ChangeEvent<{}>, values: any[]) => {
        console.log("VALUES: ", values)
        setDependenciesDescription(values as any)
    };

    const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onLoadDepenciesFromLanguage(event.target.value)
        setLanguage(event.target.value)
    };

    const onLoadDepenciesFromLanguage = (language: string) => {
        setDependencies(libraries[language])
    }

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

    const deleteHandler = (id: number) => {
        const updateProducts = products.filter((ind: any) => ind.id !== id);
        setProducts(updateProducts);
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
                                <CheckboxesAutocomplete list={dependencies} handleChange={addDependencieToList} />
                                {/* <DeletableItemList items={products} deleteItem={deleteHandler} /> */}
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
