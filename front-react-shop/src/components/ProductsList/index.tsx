import type { ProductListProps } from "../../types";
import  { Grid, Typography } from "@mui/material";
import CardProduct from "../CardProduct";

export default function ProductList({ isLoading, isError, data }: ProductListProps) {
    if (isLoading) {
        return <Typography align="center" sx={{ py: 5 }}>Carregando produtos...</Typography>;
    }

    if (isError) {
        return <Typography color="error" align="center" sx= {{ py: 5 }}>Erro ao carregar os produtos.</Typography>;
    }

    if (!data?.data || data.data.length === 0) {
        return <Typography align="center" color="text.secondary" sx={{ py: 5 }}>Nenhum produto encontrado.</Typography>;
    }

    return (
        <Grid container spacing={4}>
            {data.data.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.documentId || product.id}>
                    <CardProduct product={product} />
                </Grid>
            ))}
        </Grid>
    );
}