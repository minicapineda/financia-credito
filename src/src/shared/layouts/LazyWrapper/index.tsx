// import { AnimatePresence } from "motion/react";
import { type ReactNode, Suspense } from "react";
import { Loading } from "../../components/Loading";

export const LazyWrapper = ({ children }: { children: ReactNode }) => (
	<Suspense fallback={<Loading />}>
		{/* <AnimatePresence mode="wait">{children}</AnimatePresence> */}
		<div>{children}</div>
	</Suspense>
);
