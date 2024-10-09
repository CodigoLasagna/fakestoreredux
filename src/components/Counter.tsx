'use client';

import { useAppDispatch, useAppSelector} from '@/store/store';
import { increment, decrement } from '@/store/counterSlice';

const Counter = () => {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();
	
	return (
		<div className="p-4">
			<h1 className="text-xl">Count: {count}</h1>
			<button
				onClick={()  => dispatch(increment())}
				className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
			>
			Increment
			</button>
			<button
				onClick={()  => dispatch(decrement())}
				className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
			>
			Decrement
			</button>
		</div>
	);
}

export default Counter;
