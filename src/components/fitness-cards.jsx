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

const FitnessCards = () => {
  return (
    <div className=" grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Total Workouts</CardDescription>

          <CardAction>
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.22998"
                y="0.680176"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#DBEAFE"
              />
              <path
                d="M11.217 14.1641C11.217 13.6115 11.6635 13.165 12.2161 13.165H13.2151C13.7677 13.165 14.2141 13.6115 14.2141 14.1641V19.1592V21.1572V26.1524C14.2141 26.7049 13.7677 27.1514 13.2151 27.1514H12.2161C11.6635 27.1514 11.217 26.7049 11.217 26.1524V24.1543H10.218C9.66543 24.1543 9.219 23.7079 9.219 23.1553V21.1572C8.66641 21.1572 8.21997 20.7108 8.21997 20.1582C8.21997 19.6056 8.66641 19.1592 9.219 19.1592V17.1611C9.219 16.6086 9.66543 16.1621 10.218 16.1621H11.217V14.1641ZM25.2034 14.1641V16.1621H26.2024C26.755 16.1621 27.2014 16.6086 27.2014 17.1611V19.1592C27.754 19.1592 28.2005 19.6056 28.2005 20.1582C28.2005 20.7108 27.754 21.1572 27.2014 21.1572V23.1553C27.2014 23.7079 26.755 24.1543 26.2024 24.1543H25.2034V26.1524C25.2034 26.7049 24.757 27.1514 24.2044 27.1514H23.2053C22.6528 27.1514 22.2063 26.7049 22.2063 26.1524V21.1572V19.1592V14.1641C22.2063 13.6115 22.6528 13.165 23.2053 13.165H24.2044C24.757 13.165 25.2034 13.6115 25.2034 14.1641ZM21.2073 19.1592V21.1572H15.2131V19.1592H21.2073Z"
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
                x="0.179932"
                y="0.680176"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#DCFCE7"
              />
              <path
                d="M11.167 16.1621C11.167 15.1023 11.588 14.0859 12.3374 13.3364C13.0868 12.587 14.1033 12.166 15.1631 12.166C16.2229 12.166 17.2394 12.587 17.9888 13.3364C18.7382 14.0859 19.1592 15.1023 19.1592 16.1621C19.1592 17.2219 18.7382 18.2384 17.9888 18.9878C17.2394 19.7372 16.2229 20.1582 15.1631 20.1582C14.1033 20.1582 13.0868 19.7372 12.3374 18.9878C11.588 18.2384 11.167 17.2219 11.167 16.1621ZM8.16992 27.2232C8.16992 24.1481 10.6612 21.6568 13.7364 21.6568H16.5898C19.665 21.6568 22.1563 24.1481 22.1563 27.2232C22.1563 27.7352 21.7411 28.1504 21.2291 28.1504H9.09714C8.58514 28.1504 8.16992 27.7352 8.16992 27.2232ZM27.6821 17.6919L23.686 21.688C23.3926 21.9814 22.918 21.9814 22.6277 21.688L20.6296 19.6899C20.3362 19.3965 20.3362 18.9219 20.6296 18.6316C20.9231 18.3412 21.3976 18.3381 21.688 18.6316L23.1553 20.0989L26.6207 16.6304C26.9141 16.3369 27.3887 16.3369 27.679 16.6304C27.9693 16.9239 27.9725 17.3984 27.679 17.6888L27.6821 17.6919Z"
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
          <div className="text-muted-foreground">75.2% of total users</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Avg. Steps</CardDescription>

          <CardAction>
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.130127"
                y="0.680176"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#F3E8FF"
              />
              <path
                d="M21.1074 12.166C19.1188 12.166 16.1123 13.165 16.1123 13.165V17.1611C17.6109 17.1611 18.485 17.6607 19.3591 18.1602C20.2333 18.6597 21.1074 19.1592 22.606 19.1592C24.3668 19.1592 28.1006 18.6597 28.1006 16.1621C28.1006 13.6646 24.1045 12.166 21.1074 12.166ZM12.1162 15.1631C12.1162 16.2651 13.0122 17.1611 14.1143 17.1611H15.1133V13.165H14.1143C13.0122 13.165 12.1162 14.061 12.1162 15.1631ZM17.1113 28.1504C20.1084 28.1504 24.1045 26.6519 24.1045 24.1543C24.1045 21.6568 20.3707 21.1572 18.6099 21.1572C17.1113 21.1572 16.2372 21.6568 15.363 22.1563C14.4889 22.6558 13.6148 23.1553 12.1162 23.1553V27.1514C12.1162 27.1514 15.1227 28.1504 17.1113 28.1504ZM8.12012 25.1533C8.12012 26.2554 9.01612 27.1514 10.1182 27.1514H11.1172V23.1553H10.1182C9.01612 23.1553 8.12012 24.0513 8.12012 25.1533Z"
                fill="#9333EA"
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
          <div className="text-muted-foreground">daily average</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Calories Burned</CardDescription>

          <CardAction>
            <svg
              width="31"
              height="41"
              viewBox="0 0 31 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0800781"
                y="0.680176"
                width="29.96"
                height="39.96"
                rx="8"
                fill="#FFEDD5"
              />
              <path
                d="M13.0411 12.3358C13.2845 12.108 13.6621 12.1111 13.9055 12.3389C14.7667 13.1471 15.575 14.0178 16.3301 14.9602C16.6734 14.5108 17.0635 14.0209 17.4847 13.6215C17.7312 13.3905 18.112 13.3905 18.3585 13.6246C19.4382 14.6544 20.3525 16.0149 20.9953 17.3068C21.6288 18.58 22.0501 19.8813 22.0501 20.7987C22.0501 24.7805 18.9358 28.1444 15.0601 28.1444C11.1407 28.1444 8.07007 24.7774 8.07007 20.7956C8.07007 19.5973 8.62552 18.1338 9.48679 16.6858C10.3574 15.2161 11.5869 13.6839 13.0411 12.3358ZM15.1131 25.1487C15.9026 25.1487 16.6016 24.9303 17.26 24.4934C18.5738 23.576 18.9264 21.7411 18.1369 20.2994C17.9965 20.0186 17.6376 19.9998 17.4348 20.237L16.6484 21.1513C16.4425 21.3885 16.0711 21.3822 15.8776 21.1357C15.3628 20.4804 14.4422 19.3102 13.918 18.6455C13.7214 18.3959 13.3469 18.3928 13.1472 18.6424C12.0924 19.9686 11.5619 20.8049 11.5619 21.7442C11.5651 23.8818 13.1441 25.1487 15.1131 25.1487Z"
                fill="#EA580C"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            2.8M{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 3.8%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">total this week</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">
            Activity Compliance
          </CardDescription>

          <CardAction>
            <svg
              width="32"
              height="41"
              viewBox="0 0 32 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0400391"
                y="0.680176"
                width="31.97"
                height="39.96"
                rx="8"
                fill="#CCFBF1"
              />
              <path
                d="M16.03 28.1602C18.1518 28.1602 20.1866 27.3173 21.6869 25.817C23.1872 24.3167 24.03 22.2819 24.03 20.1602C24.03 18.0384 23.1872 16.0036 21.6869 14.5033C20.1866 13.003 18.1518 12.1602 16.03 12.1602C13.9083 12.1602 11.8735 13.003 10.3732 14.5033C8.87288 16.0036 8.03003 18.0384 8.03003 20.1602C8.03003 22.2819 8.87288 24.3167 10.3732 25.817C11.8735 27.3173 13.9083 28.1602 16.03 28.1602ZM19.5613 18.6914L15.5613 22.6914C15.2675 22.9852 14.7925 22.9852 14.5019 22.6914L12.5019 20.6914C12.2082 20.3977 12.2082 19.9227 12.5019 19.632C12.7957 19.3414 13.2707 19.3383 13.5613 19.632L15.03 21.1008L18.4988 17.6289C18.7925 17.3352 19.2675 17.3352 19.5582 17.6289C19.8488 17.9227 19.8519 18.3977 19.5582 18.6883L19.5613 18.6914Z"
                fill="#0D9488"
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
          <div className="text-muted-foreground">goal achievement rate</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FitnessCards;
