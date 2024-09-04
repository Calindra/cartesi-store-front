import React, { useEffect } from 'react';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import Header from '../../components/layouts/Header'
import CustomTextField from '../../components/custom-elements/CustomTextField';
import CustomRadio from '../../components/custom-elements/CustomRadio';
import CustomFormLabel from '../../components/custom-elements/CustomFormLabel';
import DependenciesFrame from './dependencies-frame/DependenciesFrame';
import useForm from '../../hooks/useForm';
import { Dependencie } from '../../models/dependencie';
import logo from '../../assets/images/cartesi-logo.svg'

const JS_DEPENDENCIES: Dependencie[] = [
    { id: 1, title: 'express', description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
    { id: 2, title: 'axios', description: "Axios is a promise-based HTTP Client for node.js and the browser." },
    { id: 3, title: 'lodash', description: "A modern JavaScript utility library delivering modularity, performance & extras." },
]

const TS_DEPENDENCIES: Dependencie[] = [
    { id: 1, title: 'express', description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
    { id: 2, title: 'axios', description: "Axios is a promise-based HTTP Client for node.js and the browser." },
    { id: 3, title: 'lodash', description: "A modern JavaScript utility library delivering modularity, performance & extras." },
]

type Libraries = {
    [key: string]: Dependencie[];
};

const libraries: Libraries = {
    "Javascript": JS_DEPENDENCIES,
    "Typescript": TS_DEPENDENCIES
}

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';

const MarketPlace = () => {
    const [selectedItems, setSelectedItems] = React.useState<Dependencie[]>([]);
    const [language, setLanguage] = React.useState("Javascript")
    const [dependencies, setDependencies] = React.useState<Dependencie[]>(libraries[language]);
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const { values, setValue, setAllValues } = useForm({
        name: "demo",
        version: "1.0.0",
        description: "Demo project for Cartesi"
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Read parameters from URL and update state
        const urlName = params.get('name');
        const urlVersion = params.get('version');
        const urlDescription = params.get('description');
        const urlLanguage = params.get('language');
        const urlDependencies = params.get('dependencies');

        setAllValues({
            name: urlName || values.name,
            version: urlVersion || values.version,
            description: urlDescription || values.description
        });


        if (urlLanguage) {
            setLanguage(urlLanguage);
            onLoadDepenciesFromLanguage(urlLanguage);
        }
        if (urlDependencies) {
            const dependenciesList: (Dependencie | undefined)[] = urlDependencies
                .split(',')
                .map(title => libraries[language]
                    .find(dep => dep.title === title)).filter(Boolean);
            setSelectedItems(dependenciesList as Dependencie[]);
        }
    }, []);

    const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onLoadDepenciesFromLanguage(event.target.value)
        setLanguage(event.target.value)
    };

    const onLoadDepenciesFromLanguage = (language: string) => {
        const choosedList: Dependencie[] = libraries[language]
        setDependencies(choosedList)
    }

    const handleShare = () => {
        setCopied(false)
        setOpen(true);
    };

    const handleCopy = async () => {
        const shareUrl = getShareLink()
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true)

        } catch (err) {
            console.log(err)
        }
    };

    const handleClose = () => {
        setOpen(false);
        setCopied(false);
    };


    const getShareLink = () => {
        const params = new URLSearchParams();

        if (values.name) params.append("name", values.name);
        if (language) params.append("language", language);
        if (values.version) params.append("version", values.version);
        if (values.description) params.append("description", values.description);

        const dependenciesTitles = selectedItems.map(dep => dep.title);
        if (dependenciesTitles.length > 0) {
            params.append("dependencies", dependenciesTitles.join(","));
        }

        return `${baseUrl}/?${params.toString()}`;
    }

    const handleClick = async () => {
        try {

            if (!values.name) {
                alert("Please fill the name of the project");
                return;
            }

            const dependenciesTitles = selectedItems.map((dep: Dependencie) => dep.title);

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
            <Header />
            <Box
                sx={{
                    padding: '15px 30px',
                }}
                display="flex"
                alignItems="center"
            >
                <Box display="flex" alignItems="center">
                    <img src={logo} width="50" />
                    <Typography sx={{ color: '#1b1a1e', pl: 1 }} fontWeight="500" variant="h1">
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
                                <DependenciesFrame list={dependencies} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button sx={{ color: '#1b1a1e' }} variant="contained" onClick={handleShare}>
                                Share
                            </Button>
                            <Button sx={{ color: '#1b1a1e' }} variant="contained" onClick={handleClick} style={{ marginLeft: '10px' }}>
                                Generate
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ color: theme => theme.palette.grey[400] }}>Share Project</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: theme => theme.palette.text.primary }}>
                        {`Use this link to share the current configuration. Attributes can be removed from the URL if you want to rely on our defaults.}`}
                    </DialogContentText>
                    <Box sx={{ overflowX: 'auto', mt: 2 }}>
                        <Typography variant="body2">
                            {getShareLink()}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleCopy} color="primary">
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MarketPlace;
