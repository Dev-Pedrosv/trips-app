"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripsReservationForm {
  text: string;
  startDate: Date | null;
  budget: string;
}

function TripSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TripsReservationForm>();

  const router = useRouter();

  const onSubmit = (data: TripsReservationForm) => {
    router.push(
      `/trips/search?text=${data.text}&startDate=${data.startDate}&budget=${data.budget}`
    );
  };

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center">
        Encontre sua proxima <span className="text-primary">viagem !</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input
          error={!!errors?.text}
          errorMessage={errors?.text?.message}
          placeholder="Onde você quer ir ?"
          {...register("text", {
            required: {
              value: true,
              message: "Texto é obrigatório.",
            },
          })}
        />

        <div className="flex gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data de Ida"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                placeholder="Orçamento"
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  );
}

export default TripSearch;
