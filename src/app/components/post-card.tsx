"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  CardFooter,
} from "@nextui-org/react";
import Link from "next/link";

import { getFormattedDate } from "../utils";
import { FavoritePostButton } from "./favorite-post-button";

export default function PostCard({
  avatarUrl,
  content,
  createdAt,
  favoritesCount,
  isFavorite,
  postId,
  userFullName,
  userName,
}: {
  avatarUrl: string;
  content: string;
  createdAt: string;
  favoritesCount: number | null;
  isFavorite: boolean;
  postId: string;
  userFullName: string;
  userName: string;
}) {
  return (
    <Card>
      <CardHeader className="justify-between">
        <div className="flex gap-x-2">
          <Link href={`/${userName}`}>
            <Avatar radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userFullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{userName} · {getFormattedDate(new Date(createdAt))}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-xs text-white bg-transparent">
        <p>{content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <FavoritePostButton
          isFavorite={isFavorite}
          favoritesCount={favoritesCount}
          postId={postId}
        />
      </CardFooter>
    </Card>
  );
}
