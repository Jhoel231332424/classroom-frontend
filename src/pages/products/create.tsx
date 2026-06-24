import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useBack, type BaseRecord, type HttpError } from "@refinedev/core";
import * as z from "zod";

import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const productCreateSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    brand: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    description: z.string().optional(),
    baseUnit: z.string().min(1, "La unidad base es requerida"),
    currentStock: z.coerce
        .number({
            required_error: "El stock es requerido",
            invalid_type_error: "El stock debe ser un número",
        })
        .int("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),
    defaultMarginPercent: z.coerce
        .number({
            required_error: "El margen es requerido",
            invalid_type_error: "El margen debe ser un número",
        })
        .min(0, "El margen no puede ser negativo"),
    suggestedSalePrice: z
        .union([
            z.coerce.number().min(0, "El precio no puede ser negativo"),
            z.literal(""),
        ])
        .optional(),
    status: z.enum(["active", "inactive"]),
});

type ProductFormValues = z.infer<typeof productCreateSchema>;

const ProductsCreate = () => {
    const back = useBack();

    const form = useForm<BaseRecord, HttpError, ProductFormValues>({
        resolver: zodResolver(productCreateSchema),
        refineCoreProps: {
            resource: "products",
            action: "create",
            redirect: "list",
        },
        defaultValues: {
            name: "",
            brand: "",
            sku: "",
            barcode: "",
            description: "",
            baseUnit: "unidad",
            currentStock: 0,
            defaultMarginPercent: 0,
            suggestedSalePrice: "",
            status: "active",
        },
    });

    const {
        refineCore: { onFinish },
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = form;

    const onSubmit = async (values: ProductFormValues) => {
        try {
            await onFinish({
                ...values,
                brand: values.brand || undefined,
                sku: values.sku || undefined,
                barcode: values.barcode || undefined,
                description: values.description || undefined,
                suggestedSalePrice: values.suggestedSalePrice === "" ? undefined : values.suggestedSalePrice,
            });
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <CreateView className="class-view">
            <Breadcrumb />

            <h1 className="page-title">Crear producto</h1>
            <div className="intro-row">
                <p>Registra la información básica del producto.</p>
                <Button onClick={() => back()}>Volver</Button>
            </div>

            <Separator />

            <div className="my-4 flex items-center">
                <Card className="class-form-card">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
                            Información del producto
                        </CardTitle>
                    </CardHeader>

                    <Separator />

                    <CardContent className="mt-7">
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nombre <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Candado tamaño 30" {...field} value={field.value || ""}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marca</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Lions LLN" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="sku"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU</FormLabel>
                                            <FormControl>
                                                <Input placeholder="CAND-LIONS-30" {...field} value={field.value || ""}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="barcode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Código de barras</FormLabel>
                                            <FormControl>
                                                <Input placeholder="7790000000000" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="baseUnit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Unidad base <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona una unidad" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="unidad">Unidad</SelectItem>
                                                    <SelectItem value="docena">Docena</SelectItem>
                                                    <SelectItem value="caja">Caja</SelectItem>
                                                    <SelectItem value="kg">Kilogramo</SelectItem>
                                                    <SelectItem value="g">Gramo</SelectItem>
                                                    <SelectItem value="litro">Litro</SelectItem>
                                                    <SelectItem value="metro">Metro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="currentStock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Stock inicial <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" min={0} placeholder="0" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="defaultMarginPercent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Margen por defecto %{" "}
                                                <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" min={0} step="0.01" placeholder="30" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="suggestedSalePrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Precio sugerido</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={0} step="0.01" placeholder="15.50"
                                                       {...field} value={field.value ?? ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona un estado" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Activo</SelectItem>
                                                    <SelectItem value="inactive">Inactivo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descripción del producto..."
                                                    className="min-h-28"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Creando..." : "Crear producto"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </CreateView>
    );
};

export default ProductsCreate;