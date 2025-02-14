import { useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

interface PriceInputProps {
    data: { price: number };
    setData: (key: string, value: number) => void;
    errors: { price?: string };
}

export default function PriceInput({ data, setData, errors }: PriceInputProps) {
    const [formattedPrice, setFormattedPrice] = useState<string>("");

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
        const numericValue = rawValue ? parseInt(rawValue, 10) : 0;

        setData("price", numericValue); // Simpan angka murni ke state utama

        // Format ke Rupiah
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(numericValue);

        setFormattedPrice(formatted);
    };

    return (
        <div className="mb-4">
            <Label htmlFor="Price">Price</Label>
            <Input
                id="Price"
                type="text"
                placeholder="Harga produk"
                value={formattedPrice} // Menampilkan format Rupiah
                onChange={handlePriceChange}
            />
            {errors.price && <div className="text-red-500">{errors.price}</div>}
        </div>
    );
}
