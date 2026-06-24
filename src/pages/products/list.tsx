import { ListView } from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useMemo, useState } from "react";
import { CreateButton } from "@/components/refine-ui/buttons/create.tsx";
import { DataTable } from "@/components/refine-ui/data-table/data-table.tsx";
import { useTable } from "@refinedev/react-table";
import type { Product } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";

const ProductsList = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const productColumns = useMemo<ColumnDef<Product>[]>(
        () => [
            {
                id: "name",
                accessorKey: "name",
                size: 220,
                header: () => <p className="column-title">Producto</p>,
                cell: ({ getValue }) => (
                    <span className="text-foreground">{getValue<string>()}</span>
                ),
            },
            {
                id: "brand",
                accessorKey: "brand",
                size: 160,
                header: () => <p className="column-title">Marca</p>,
                cell: ({ getValue }) => (
                    <span>{getValue<string>() || "Sin marca"}</span>
                ),
            },
            {
                id: "sku",
                accessorKey: "sku",
                size: 120,
                header: () => <p className="column-title">SKU</p>,
                cell: ({ getValue }) =>
                    getValue<string>() ? <Badge>{getValue<string>()}</Badge> : "-",
            },
            {
                id: "baseUnit",
                accessorKey: "baseUnit",
                size: 120,
                header: () => <p className="column-title">Unidad</p>,
                cell: ({ getValue }) => <span>{getValue<string>()}</span>,
            },
            {
                id: "currentStock",
                accessorKey: "currentStock",
                size: 120,
                header: () => <p className="column-title">Stock</p>,
                cell: ({ getValue }) => (
                    <Badge variant="secondary">{getValue<number>()}</Badge>
                ),
            },
            {
                id: "suggestedSalePrice",
                accessorKey: "suggestedSalePrice",
                size: 160,
                header: () => <p className="column-title">Precio sugerido</p>,
                cell: ({ getValue }) => {
                    const value = getValue<string | null>();
                    return <span>{value ? `Bs ${value}` : "-"}</span>;
                },
            },
            {
                id: "status",
                accessorKey: "status",
                size: 120,
                header: () => <p className="column-title">Estado</p>,
                cell: ({ getValue }) => (
                    <Badge>{getValue<string>() === "active" ? "Activo" : "Inactivo"}</Badge>
                ),
            },
        ],
        []
    );

    const searchFilters = searchQuery
        ? [
            {
                field: "search",
                operator: "contains" as const,
                value: searchQuery,
            },
        ]
        : [];

    const productTable = useTable<Product>({
        columns: productColumns,
        refineCoreProps: {
            resource: "products",
            pagination: {
                pageSize: 10,
                mode: "server",
            },
            filters: {
                permanent: [...searchFilters],
            },
            sorters: {
                initial: [
                    {
                        field: "id",
                        order: "desc",
                    },
                ],
            },
        },
    });

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Productos</h1>

            <div className="intro-row">
                <p>Gestiona los productos registrados en el inventario.</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />
                        <Input
                            type="text"
                            placeholder="Buscar por nombre, marca, SKU o código..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </div>

                    <CreateButton resource="products" />
                </div>
            </div>

            <DataTable table={productTable} />
        </ListView>
    );
};

export default ProductsList;