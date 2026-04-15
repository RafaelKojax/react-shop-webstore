import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Products } from '../types';
import { getFullImageUrl } from '../utils/formatImage';
import { 
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Grid,
    Button,
    CardActions
} from '@mui/material';

const Catalogo: React.FC = () => {
    const dispatch = useDispatch();   
    const [products, setProducts] = useState<Products[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<boolean>(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setErro(false);
                setCarregando(true);
                const resposta = await api.get('/products?populate=image');

                setProducts(resposta.data.data);
            } catch (error) {
                console.error("Erro ao carregar:", error);
                setErro(true);
            } finally {
            setCarregando(false);
            }
        };

        carregarDados();
    }, []);

    if (carregando) {
        return <div style={{ padding: '20px' }}>Carregando produtos...</div>;
    }

    if (erro) {
        return <div style={{ padding: '20px', color: 'red' }}>Erro ao conectar com o servidor.</div>;
    }
    
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>Catálogo de Produtos</Typography>

            {products.length === 0 ? (
                <Typography>Ops, nenhum produto disponível no momento.</Typography>
            ) : (
                <Grid container spacing={3}>
                   
                   {products.map((p) => {
                     const path = p.image?.formats?.medium?.url || p.image?.url;
                     const imageUrl = getFullImageUrl(path);
                     
                     return (
                        <Grid size={{ xs:12, sm: 6, md: 4, lg: 3 }} key={p.documentId}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={imageUrl}
                                    alt={p.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" noWrap>{p.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ height: 40, overflow: 'hidden', mb: 2 }}>
                                        {p.description}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                        <Typography variant="h5" color="primary" fontWeight="bold">
                                            R$ {p.price.toFixed(2)}
                                        </Typography> 
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        onClick={ () => dispatch(addToCart(p))}
                                    >
                                        Comprar
                                    </Button>    
                                </CardActions>
                            </Card>
                        </Grid>
                     );
                   })}
                </Grid>  
            )}
        </div>
    );
    
}
export default Catalogo;