import {
  ApiResponse,
  BankCard,
  CompleteProfileResponse,
  Profile,
} from "@/app/_lib/type";
import { NextResponse } from "next/server";
import { runQuery } from "../../../../../util/qeuryService";

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<CompleteProfileResponse>>> {
  try {
    const { userId } = await req.json();

    if (!userId || isNaN(Number(userId))) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_USER_ID",
          message: "Valid numeric userId is required",
        },
        { status: 400 }
      );
    }

    // First, get the profileId from the User table
    const userQuery = `
      SELECT "profileId" 
      FROM "User" 
      WHERE id = $1
    `;

    const userResult = await runQuery<{ profileId: number }>(userQuery, [
      userId,
    ]);

    if (userResult.length === 0 || !userResult[0].profileId) {
      return NextResponse.json(
        {
          success: false,
          error: "PROFILE_NOT_FOUND",
          message: "No profile is associated with this user",
        },
        { status: 404 }
      );
    }

    const profileId = userResult[0].profileId;

    // Now get the profile using the profileId
    const profileQuery = `
      SELECT 
        p.id,
        p.name,
        p.about,
        p."socialMediaURL",
        p."avatarImage",
        p."backgroundImage",
        p."successMessage",
        p."created_at",
        p."updated_at"
      FROM "Profile" p
      WHERE p.id = $1
    `;

    const bankCardQuery = `
      SELECT 
        "id",
        "country",
        "firstName",
        "lastName",
        "cardNumber",
        "expiryDate",
        "cvc",
        "created_at",
        "updated_at"
      FROM "BankCard"
      WHERE "userId" = $1
      LIMIT 1
    `;

    const [profileResult, bankCardResult] = await Promise.all([
      runQuery<Profile>(profileQuery, [profileId]),
      runQuery<BankCard>(bankCardQuery, [userId]),
    ]);

    if (profileResult.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "PROFILE_NOT_FOUND",
          message: "Profile data not found even though user has profileId",
        },
        { status: 404 }
      );
    }

    const responseData: CompleteProfileResponse = {
      profile: {
        id: profileResult[0].id,
        userId: userId,
        name: profileResult[0].name,
        about: profileResult[0].about,
        avatarImage: profileResult[0].avatarImage,
        socialMediaURL: profileResult[0].socialMediaURL,
        backgroundImage: profileResult[0].backgroundImage,
        successMessage:
          profileResult[0].successMessage || "Thank you for your support!",
        created_at: profileResult[0].created_at,
        updated_at: profileResult[0].updated_at,
      },
      bankCard:
        bankCardResult.length > 0
          ? {
              id: bankCardResult[0].id,
              country: bankCardResult[0].country,
              firstName: bankCardResult[0].firstName,
              lastName: bankCardResult[0].lastName,
              cardNumber: bankCardResult[0].cardNumber,
              expiryDate: bankCardResult[0].expiryDate,
              cvc: bankCardResult[0].cvc,
              userId: userId,
              created_at: bankCardResult[0].created_at,
              updated_at: bankCardResult[0].updated_at,
            }
          : undefined,
    };

    return NextResponse.json(
      {
        success: true,
        data: responseData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to fetch profile data:", err);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch profile data",
        ...(process.env.NODE_ENV === "development" && {
          details: err instanceof Error ? err.message : String(err),
        }),
      },
      { status: 500 }
    );
  }
}
