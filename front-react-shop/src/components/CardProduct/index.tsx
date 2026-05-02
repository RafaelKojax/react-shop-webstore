import { Card, CardContent, Typography, CardActions, Button, Box } from  "@mui/material";

interface CardProductProps {
    product: any;
}

export default function CardProduct({ product }: CardProductProps) {
    const name = product.attributes?.name || product.name || "Produto Padrão";
    const price = product.attributes?.price || product.price || 0;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
            <Box sx={{ p: 2, backgroundColor: "#f5f5f5", textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Imagem do Produto
                </Typography>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {name}
                </Typography>
                <Typography variant="h6" color="primary">
                    R$ {Number(price).toFixed(2).replace('.', ',')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" fullWidth color="primary">
                    Adicionar ao Carrinho
                </Button>
            </CardActions>
        </Card>
    );
}