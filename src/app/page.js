/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Ali Huseynli Student ID: 124694233 Date: 07/05/2024
 *
 ********************************************************************************/

"use client";

import WeatherCard from "@/components/WeatherCard";
import CitiesSearch from "@/components/CitiesSearch";

export default function Home() {
  return (
    <main className="h-100">
      <div className="container d-flex gap-5 justify-content-between h-100">
        <WeatherCard />
        <CitiesSearch />
      </div>
    </main>
  );
}
