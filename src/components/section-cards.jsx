import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

export function SectionCards() {
  return (
    <div className=" grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Total Users</CardDescription>

          <CardAction>
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.739746"
                y="0.660156"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#DBEAFE"
              />
              <path
                d="M13.2256 12.146C13.888 12.146 14.5233 12.4091 14.9916 12.8775C15.46 13.3459 15.7232 13.9812 15.7232 14.6436C15.7232 15.306 15.46 15.9412 14.9916 16.4096C14.5233 16.878 13.888 17.1411 13.2256 17.1411C12.5632 17.1411 11.9279 16.878 11.4595 16.4096C10.9912 15.9412 10.728 15.306 10.728 14.6436C10.728 13.9812 10.9912 13.3459 11.4595 12.8775C11.9279 12.4091 12.5632 12.146 13.2256 12.146ZM24.7144 12.146C25.3768 12.146 26.012 12.4091 26.4804 12.8775C26.9488 13.3459 27.2119 13.9812 27.2119 14.6436C27.2119 15.306 26.9488 15.9412 26.4804 16.4096C26.012 16.878 25.3768 17.1411 24.7144 17.1411C24.052 17.1411 23.4167 16.878 22.9483 16.4096C22.48 15.9412 22.2168 15.306 22.2168 14.6436C22.2168 13.9812 22.48 13.3459 22.9483 12.8775C23.4167 12.4091 24.052 12.146 24.7144 12.146ZM8.72998 21.4713C8.72998 19.6324 10.2223 18.1401 12.0611 18.1401H13.3942C13.8906 18.1401 14.362 18.2494 14.7866 18.443C14.746 18.6678 14.7273 18.9019 14.7273 19.1392C14.7273 20.3318 15.2517 21.4026 16.0791 22.1362C16.0728 22.1362 16.0666 22.1362 16.0572 22.1362H9.39496C9.02969 22.1362 8.72998 21.8365 8.72998 21.4713ZM21.3833 22.1362C21.377 22.1362 21.3708 22.1362 21.3614 22.1362C22.1918 21.4026 22.7132 20.3318 22.7132 19.1392C22.7132 18.9019 22.6914 18.6709 22.6539 18.443C23.0785 18.2463 23.5499 18.1401 24.0463 18.1401H25.3794C27.2182 18.1401 28.7105 19.6324 28.7105 21.4713C28.7105 21.8397 28.4108 22.1362 28.0455 22.1362H21.3833ZM15.7232 19.1392C15.7232 18.3443 16.0389 17.582 16.601 17.0199C17.163 16.4579 17.9254 16.1421 18.7202 16.1421C19.5151 16.1421 20.2774 16.4579 20.8395 17.0199C21.4015 17.582 21.7173 18.3443 21.7173 19.1392C21.7173 19.934 21.4015 20.6964 20.8395 21.2584C20.2774 21.8205 19.5151 22.1362 18.7202 22.1362C17.9254 22.1362 17.163 21.8205 16.601 21.2584C16.0389 20.6964 15.7232 19.934 15.7232 19.1392ZM12.7261 27.2968C12.7261 24.9991 14.5899 23.1353 16.8876 23.1353H20.5528C22.8506 23.1353 24.7144 24.9991 24.7144 27.2968C24.7144 27.7558 24.3429 28.1304 23.8808 28.1304H13.5596C13.1007 28.1304 12.7261 27.7589 12.7261 27.2968Z"
                fill="#2563EB"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            24,521{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 12.5%
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
                x="0.179688"
                y="0.660156"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#DCFCE7"
              />
              <path
                d="M11.167 16.1421C11.167 15.0823 11.588 14.0658 12.3374 13.3164C13.0868 12.567 14.1033 12.146 15.1631 12.146C16.2229 12.146 17.2394 12.567 17.9888 13.3164C18.7382 14.0658 19.1592 15.0823 19.1592 16.1421C19.1592 17.2019 18.7382 18.2184 17.9888 18.9678C17.2394 19.7172 16.2229 20.1382 15.1631 20.1382C14.1033 20.1382 13.0868 19.7172 12.3374 18.9678C11.588 18.2184 11.167 17.2019 11.167 16.1421ZM8.16992 27.2032C8.16992 24.1281 10.6612 21.6367 13.7364 21.6367H16.5898C19.665 21.6367 22.1563 24.1281 22.1563 27.2032C22.1563 27.7152 21.7411 28.1304 21.2291 28.1304H9.09714C8.58514 28.1304 8.16992 27.7152 8.16992 27.2032ZM27.6821 17.6719L23.686 21.668C23.3926 21.9614 22.918 21.9614 22.6277 21.668L20.6296 19.6699C20.3362 19.3764 20.3362 18.9019 20.6296 18.6116C20.9231 18.3212 21.3976 18.3181 21.688 18.6116L23.1553 20.0789L26.6207 16.6104C26.9141 16.3169 27.3887 16.3169 27.679 16.6104C27.9693 16.9039 27.9725 17.3784 27.679 17.6687L27.6821 17.6719Z"
                fill="#16A34A"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            18,432{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 8.3%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">75.2% of total users</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">Retention Rate</CardDescription>

          <CardAction>
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.619629"
                y="0.660156"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#F3E8FF"
              />
              <path
                d="M15.603 20.1382C16.6629 20.1382 17.6793 19.7172 18.4287 18.9678C19.1781 18.2184 19.5991 17.2019 19.5991 16.1421C19.5991 15.0823 19.1781 14.0658 18.4287 13.3164C17.6793 12.567 16.6629 12.146 15.603 12.146C14.5432 12.146 13.5268 12.567 12.7774 13.3164C12.028 14.0658 11.6069 15.0823 11.6069 16.1421C11.6069 17.2019 12.028 18.2184 12.7774 18.9678C13.5268 19.7172 14.5432 20.1382 15.603 20.1382ZM14.1763 21.6367C11.1012 21.6367 8.60986 24.1281 8.60986 27.2032C8.60986 27.7152 9.02508 28.1304 9.53708 28.1304H21.669C21.7252 28.1304 21.7783 28.1242 21.8345 28.1148C19.4524 26.3946 18.7187 23.7128 18.6157 21.8646C18.1131 21.7148 17.5824 21.6367 17.0329 21.6367H14.1763ZM23.8169 19.1922L20.0706 20.6908C19.7865 20.8063 19.5991 21.081 19.5991 21.387C19.5991 23.3632 20.4077 26.6568 23.8075 28.0742C23.9917 28.1523 24.2009 28.1523 24.3851 28.0742C27.7818 26.6568 28.5904 23.3632 28.5904 21.387C28.5904 21.081 28.403 20.8063 28.1189 20.6908L24.3726 19.1922C24.1947 19.1204 23.9948 19.1204 23.8169 19.1922ZM27.0731 21.8865C26.9513 23.4693 26.2239 25.5298 24.0948 26.5601V20.6939L27.0731 21.8865Z"
                fill="#9333EA"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            84.7%{" "}
            <p className="text-xs text-green-400 flex items-center">
              <RiArrowUpLine /> 2.1%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">30-day retention</div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-md justify-between">
        <CardHeader>
          <CardDescription className="mt-3">
            Avg Session Duration
          </CardDescription>

          <CardAction>
            <svg
              width="31"
              height="41"
              viewBox="0 0 31 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0700684"
                y="0.660156"
                width="29.96"
                height="39.96"
                rx="8"
                fill="#FFEDD5"
              />
              <path
                d="M13.5524 12.147C13.0001 12.147 12.5539 12.5932 12.5539 13.1455C12.5539 13.6979 13.0001 14.1441 13.5524 14.1441H14.0517V15.2176C10.9405 15.6981 8.55957 18.388 8.55957 21.6334C8.55957 25.2189 11.4648 28.1241 15.0503 28.1241C18.6358 28.1241 21.541 25.2189 21.541 21.6334C21.541 20.329 21.1572 19.1151 20.4956 18.101L21.2477 17.3489C21.6377 16.9588 21.6377 16.3254 21.2477 15.9353C20.8576 15.5452 20.2241 15.5452 19.8341 15.9353L19.16 16.6093C18.2832 15.8916 17.2191 15.3986 16.0489 15.2176V14.1441H16.5481C17.1005 14.1441 17.5467 13.6979 17.5467 13.1455C17.5467 12.5932 17.1005 12.147 16.5481 12.147H15.0503H13.5524ZM15.7992 18.1384V22.1327C15.7992 22.5477 15.4653 22.8816 15.0503 22.8816C14.6353 22.8816 14.3014 22.5477 14.3014 22.1327V18.1384C14.3014 17.7234 14.6353 17.3895 15.0503 17.3895C15.4653 17.3895 15.7992 17.7234 15.7992 18.1384Z"
                fill="#EA580C"
              />
            </svg>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
            24:18{" "}
            <p className="text-xs text-red-400 flex items-center">
              <RiArrowDownLine /> 1.3%
            </p>
          </CardTitle>
          <div className="text-muted-foreground">minutes per session</div>
        </CardFooter>
      </Card>
    </div>
  );
}
