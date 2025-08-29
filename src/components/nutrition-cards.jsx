import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

const NutritionCards = () => {
  return (
    <div className=" grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Total Meals Logged</CardDescription>

          <CardAction>
            <svg
              width="31"
              height="41"
              viewBox="0 0 31 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0605469"
                y="0.130371"
                width="29.96"
                height="39.96"
                rx="8"
                fill="#DBEAFE"
              />
              <path
                d="M21.0224 11.6172C20.5232 11.6172 17.0282 12.6158 17.0282 17.1093V20.6043C17.0282 21.7059 17.9238 22.6015 19.0253 22.6015H20.0239V26.5958C20.0239 27.1481 20.4701 27.5943 21.0224 27.5943C21.5748 27.5943 22.021 27.1481 22.021 26.5958V22.6015V19.1065V12.6158C22.021 12.0634 21.5748 11.6172 21.0224 11.6172ZM10.0382 12.1165C10.0382 11.8606 9.84781 11.6484 9.59192 11.6203C9.33604 11.5922 9.10824 11.7607 9.05207 12.0073L8.10655 16.2605C8.06286 16.4571 8.04102 16.6569 8.04102 16.8566C8.04102 18.2889 9.13632 19.4653 10.5374 19.5933V26.5958C10.5374 27.1481 10.9837 27.5943 11.536 27.5943C12.0884 27.5943 12.5346 27.1481 12.5346 26.5958V19.5933C13.9357 19.4653 15.031 18.2889 15.031 16.8566C15.031 16.6569 15.0092 16.4571 14.9655 16.2605L14.02 12.0073C13.9638 11.7576 13.7298 11.5922 13.477 11.6203C13.2242 11.6484 13.0339 11.8606 13.0339 12.1165V16.3042C13.0339 16.4727 12.8966 16.61 12.7281 16.61C12.5689 16.61 12.4378 16.4883 12.4222 16.3292L12.0322 12.0728C12.0103 11.8138 11.795 11.6172 11.536 11.6172C11.277 11.6172 11.0617 11.8138 11.0399 12.0728L10.6529 16.3292C10.6373 16.4883 10.5062 16.61 10.3471 16.61C10.1786 16.61 10.0413 16.4727 10.0413 16.3042V12.1165H10.0382ZM11.5454 16.8597H11.536H11.5267L11.536 16.8378L11.5454 16.8597Z"
                fill="#2563EB"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            58,842{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 8.3%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">vs previous period</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Active Users</CardDescription>

          <CardAction>
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.810547"
                y="0.120117"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#DCFCE7"
              />
              <path
                d="M11.7979 15.6123C11.7979 14.5525 12.2189 13.5361 12.9683 12.7866C13.7177 12.0372 14.7341 11.6162 15.794 11.6162C16.8538 11.6162 17.8702 12.0372 18.6196 12.7866C19.369 13.5361 19.7901 14.5525 19.7901 15.6123C19.7901 16.6721 19.369 17.6886 18.6196 18.438C17.8702 19.1874 16.8538 19.6084 15.794 19.6084C14.7341 19.6084 13.7177 19.1874 12.9683 18.438C12.2189 17.6886 11.7979 16.6721 11.7979 15.6123ZM8.80078 26.6734C8.80078 23.5983 11.2921 21.1069 14.3672 21.1069H17.2207C20.2958 21.1069 22.7871 23.5983 22.7871 26.6734C22.7871 27.1854 22.3719 27.6006 21.8599 27.6006H9.728C9.216 27.6006 8.80078 27.1854 8.80078 26.6734ZM28.313 17.1421L24.3169 21.1382C24.0234 21.4316 23.5489 21.4316 23.2585 21.1382L21.2605 19.1401C20.967 18.8467 20.967 18.3721 21.2605 18.0818C21.554 17.7914 22.0285 17.7883 22.3188 18.0818L23.7862 19.5491L27.2515 16.0806C27.545 15.7871 28.0195 15.7871 28.3099 16.0806C28.6002 16.3741 28.6033 16.8486 28.3099 17.1389L28.313 17.1421Z"
                fill="#16A34A"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            15,723{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 5.2%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">tracking nutrition</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Avg. Calories</CardDescription>

          <CardAction>
            <svg
              width="31"
              height="41"
              viewBox="0 0 31 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.560547"
                y="0.120117"
                width="29.96"
                height="39.96"
                rx="8"
                fill="#FFEDD5"
              />
              <path
                d="M13.5218 11.786C13.7652 11.5582 14.1428 11.5613 14.3862 11.7891C15.2475 12.5973 16.0557 13.468 16.8108 14.4104C17.1541 13.961 17.5442 13.4711 17.9654 13.0717C18.212 12.8407 18.5927 12.8407 18.8392 13.0748C19.9189 14.1046 20.8332 15.4651 21.476 16.757C22.1095 18.0302 22.5308 19.3315 22.5308 20.2489C22.5308 24.2307 19.4165 27.5946 15.5408 27.5946C11.6214 27.5946 8.55078 24.2276 8.55078 20.2458C8.55078 19.0475 9.10624 17.584 9.9675 16.136C10.8381 14.6663 12.0676 13.1341 13.5218 11.786ZM15.5938 24.5989C16.3833 24.5989 17.0823 24.3805 17.7408 23.9436C19.0545 23.0262 19.4071 21.1913 18.6176 19.7496C18.4772 19.4688 18.1183 19.45 17.9155 19.6872L17.1291 20.6015C16.9232 20.8387 16.5518 20.8324 16.3584 20.5859C15.8435 19.9306 14.9229 18.7604 14.3987 18.0957C14.2021 17.8461 13.8276 17.843 13.6279 18.0926C12.5732 19.4188 12.0427 20.2551 12.0427 21.1944C12.0458 23.332 13.6248 24.5989 15.5938 24.5989Z"
                fill="#EA580C"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            2,145{" "}
            <p className="text-xs text-red-400 flex items-center">
              <RiArrowDownLine /> 2.1%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">per user daily</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Hydration Rate</CardDescription>

          <CardAction>
            <svg
              width="29"
              height="41"
              viewBox="0 0 29 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.310547"
                y="0.120117"
                width="27.97"
                height="39.96"
                rx="8"
                fill="#DBEAFE"
              />
              <path
                d="M14.2958 27.6004C10.986 27.6004 8.30078 24.9152 8.30078 21.6054C8.30078 18.7578 12.3661 13.4154 13.5027 11.9791C13.69 11.7449 13.9679 11.6138 14.2677 11.6138H14.3239C14.6236 11.6138 14.9015 11.7449 15.0889 11.9791C16.2254 13.4154 20.2908 18.7578 20.2908 21.6054C20.2908 24.9152 17.6055 27.6004 14.2958 27.6004ZM11.2983 22.105C11.2983 21.8302 11.0735 21.6054 10.7987 21.6054C10.5239 21.6054 10.2991 21.8302 10.2991 22.105C10.2991 24.0378 11.8634 25.6021 13.7962 25.6021C14.071 25.6021 14.2958 25.3773 14.2958 25.1025C14.2958 24.8277 14.071 24.6029 13.7962 24.6029C12.4161 24.6029 11.2983 23.4851 11.2983 22.105Z"
                fill="#2563EB"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            78.5%{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 3.8%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">goal compliance</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Macro Compliance</CardDescription>

          <CardAction>
            <svg
              width="35"
              height="41"
              viewBox="0 0 35 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0703125"
                y="0.130371"
                width="33.96"
                height="39.96"
                rx="8"
                fill="#F3E8FF"
              />
              <path
                d="M17.5548 19.1096V12.1322C17.5548 11.8511 17.7735 11.6138 18.0546 11.6138C21.918 11.6138 25.0507 14.7464 25.0507 18.6099C25.0507 18.891 24.8133 19.1096 24.5322 19.1096H17.5548ZM9.05957 20.109C9.05957 16.3205 11.8736 13.1848 15.5247 12.685C15.8121 12.6444 16.0557 12.8756 16.0557 13.166V20.6088L20.9436 25.4967C21.1528 25.7059 21.1372 26.0495 20.8967 26.2182C19.6724 27.0927 18.1733 27.6049 16.5554 27.6049C12.4171 27.6049 9.05957 24.2505 9.05957 20.109ZM25.5004 20.6088C25.7909 20.6088 26.0189 20.8524 25.9814 21.1397C25.7409 22.8856 24.9008 24.4379 23.6733 25.5841C23.4859 25.759 23.1923 25.7465 23.0112 25.5623L18.0546 20.6088H25.5004Z"
                fill="#9333EA"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            64.2%{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 1.5%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">of users on target</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NutritionCards;
