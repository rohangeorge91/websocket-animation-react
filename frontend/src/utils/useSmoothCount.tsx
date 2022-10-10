import { MutableRefObject, useRef } from "react";

interface SmoothCountProps {
	ref: MutableRefObject<any>;
	target: number;
	duration: number;
	curve?: number[];
	startAt?: number;
	preventStart?: boolean;
}

export function useSmoothCount({
	ref,
	target,
	duration,
	curve,
	startAt,
	preventStart
}: SmoothCountProps): Record<string, any> {
	const bezier: number[] = curve ? curve : [0, 0, 1, 1]; // Nullish coalescing operator is not supported by terser yet
	const startsAt: number = startAt ? startAt : 1;
	const decimals: number = target.toString().split(".")[1]?.length || 0;

	let cur = startsAt;
	const progress = useRef(0);
	let timer: NodeJS.Timeout;

	!preventStart && start();

	function start() {
		timer = setInterval(() => {
			if (ref.current === null) return;
			let t = progress.current;

			const d1y = t * bezier[1] + t * (bezier[1] + t * (bezier[3] - bezier[1]) - t * bezier[1]);
			const d2y =
				bezier[1] +
				t * (bezier[3] - bezier[1]) +
				t * (bezier[3] + t * (1 - bezier[3]) - (bezier[1] + t * (bezier[3] - bezier[1])));

			if (Math.abs(cur) >= Math.abs(target) || t >= 1) {
				cur = target;
				ref.current.textContent = cur.toFixed(decimals);
				return end();
			}

			progress.current = t + 1 / (duration * 50); // 50 is technically correct, although the actual time varies on different devices based on specs
			cur = startsAt + (d1y + (d2y - d1y) * t) * (target - startsAt);
			ref.current.textContent = cur.toFixed(decimals);
		}, 20);
	}

	function end() {
		clearInterval(timer);
	}

	return {
		current: cur.toFixed(decimals),
		start: start,
		end: end
	};
}