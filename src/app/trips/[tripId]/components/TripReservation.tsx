"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { formatCurrency } from "@/lib/format-currency";
import { data } from "autoprefixer";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripsReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

function TripReservation({
  tripId,
  tripStartDate,
  tripEndDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripsReservationForm>();

  const router = useRouter();

  const onSubmit = async (data: TripsReservationForm) => {
    const response = await fetch("/api/trips/check", {
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
      method: "POST",
    }).then((res) => res.json());

    if (response?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });

      setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });
      return;
    }

    if (response?.error?.code === "INVALID_START_DATE") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });
      return;
    }

    if (response?.error?.code === "INVALID_END_DATE") {
      setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });
      return;
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&guests=${
        data.guests
      }`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data de Início"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data Final"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}`,
          },
        })}
        type="number"
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? formatCurrency(differenceInDays(endDate, startDate) * pricePerDay)
            : "R$ 0,00"}
        </p>
      </div>

      <div className="pb-10 border-b border-grayLighter w-full">
        <Button
          className="mt-3 w-full"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}

export default TripReservation;
