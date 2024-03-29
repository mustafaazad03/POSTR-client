import React from "react";
import SideHeader from "../components/Header/SideHeader";
import { getSession, useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import ChatHead from "./../components/Chat/ChatHead";
import ChatMain from "./../components/Chat/ChatMain";

function chat({ session }: any) {
	return (
		<>
			{session && (
				<div className="flex overflow-hidden scrollbar-hide">
					<SideHeader>
						<ChatHead />
					</SideHeader>
					<ChatMain />
				</div>
			)}
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
};

export default chat;
