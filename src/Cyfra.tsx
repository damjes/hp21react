const kolor_tla = '#000'
const kolor_on = '#f00'
const kolor_off = '#200'

const styl_on = {
	fill: kolor_on
}

const styl_off = {
	fill: kolor_off
}

const segmenty: Record<string, boolean[]> = {
	'0': [true, true, true, true, true, true, false],
	'1': [false, true, true, false, false, false, false],
	'2': [true, true, false, true, true, false, true],
	'3': [true, true, true, true, false, false, true],
	'4': [false, true, true, false, false, true, true],
	'5': [true, false, true, true, false, true, true],
	'6': [true, false, true, true, true, true, true],
	'7': [true, true, true, false, false, false, false],
	'8': [true, true, true, true, true, true, true],
	'9': [true, true, true, true, false, true, true],
	' ': [false, false, false, false, false, false, false],
	'-': [false, false, false, false, false, false, true],
	'E': [true, false, false, true, true, true, true],
	'r': [false, false, false, false, true, false, true],
	'o': [false, false, true, true, true, false, true],
}

const kształty = [
	"M 61.6164 39.765 L 121.296 39.765 L 136.519 5.36499 C 134.584 5.00499 132.577 4.81498 130.497 4.81498 L 65.4677 4.81498 C 52.7678 4.81498 40.7745 11.765 33.5124 22.045 Z",
	"M 125.784 39.775 L 118.329 100.495 C 118.757 100.595 119.184 100.695 119.591 100.805 C 121.139 101.225 122.552 101.775 123.916 102.395 C 126.635 103.625 129.11 105.125 131.425 106.795 C 135.573 109.825 139.188 113.455 142.212 117.575 C 145.163 113.985 147.729 110.095 149.717 105.965 C 150.99 103.335 152.053 100.625 152.881 97.8749 C 153.679 95.1149 154.252 92.3249 154.624 89.5349 L 160.787 39.3449 C 162.68 23.925 154.045 10.775 140.565 6.37499 Z",
	"M 147.193 144.274 C 147.041 141.525 146.644 138.815 146.017 136.185 C 145.044 132.055 143.431 128.165 141.362 124.575 C 137.325 128.695 132.821 132.325 127.929 135.355 C 125.202 137.035 122.359 138.525 119.338 139.755 C 117.824 140.365 116.276 140.915 114.623 141.345 C 114.18 141.455 113.736 141.565 113.286 141.655 L 104.865 210.234 L 104.865 210.234 L 111.436 243.615 C 126.006 239.214 137.87 226.074 139.764 210.645 L 146.891 152.605 C 147.203 149.815 147.315 147.025 147.195 144.264 Z",
	"M 100.365 210.235 L 40.6654 210.235 L 5.61132 218.415 C 7.28401 233.705 19.6343 245.185 35.9641 245.185 L 100.993 245.185 C 103.073 245.185 105.128 244.984 107.151 244.634 L 100.375 210.234 Z",
	"M 49.0859 141.655 C 48.6582 141.555 48.2305 141.455 47.8252 141.335 C 46.2768 140.915 44.8643 140.365 43.5005 139.745 C 40.7816 138.515 38.3057 137.015 35.9909 135.345 C 31.8429 132.315 28.2286 128.685 25.2045 124.565 C 22.2538 128.154 19.6862 132.045 17.6991 136.175 C 16.4262 138.805 15.3634 141.515 14.5358 144.264 C 13.7382 147.015 13.1668 149.795 12.7954 152.575 L 5.66542 210.645 C 5.51933 211.835 5.43443 213.015 5.41193 214.175 L 41.2069 205.825 L 49.0871 141.645 Z",
	"M 26.6982 39.3449 L 20.5321 89.5649 C 20.2207 92.3449 20.1094 95.1249 20.2317 97.8749 C 20.3841 100.625 20.7813 103.335 21.4083 105.965 C 22.3812 110.095 23.9937 113.985 26.0628 117.575 C 30.0987 113.455 34.6043 109.825 39.4963 106.795 C 42.2226 105.115 45.0655 103.625 48.0865 102.395 C 49.6014 101.785 51.1488 101.235 52.8017 100.805 C 53.2451 100.695 53.6886 100.585 54.141 100.485 L 60.991 44.695 L 31.1146 25.8549 C 28.8351 30.005 27.2864 34.555 26.6995 39.3349 Z",
	"M 118.142 135.815 C 120.847 134.715 123.465 133.345 125.986 131.795 C 130.78 128.825 135.226 125.195 139.131 121.085 C 136.237 116.965 132.681 113.345 128.616 110.375 C 126.476 108.825 124.194 107.454 121.759 106.355 C 120.537 105.805 119.286 105.325 117.98 104.965 C 116.684 104.605 115.338 104.335 113.939 104.325 L 57.5994 104.325 C 56.1995 104.325 54.785 104.605 53.4008 104.965 C 52.0079 105.315 50.6277 105.805 49.2802 106.355 C 46.5752 107.454 43.9569 108.825 41.4367 110.375 C 36.6421 113.345 32.1964 116.975 28.2918 121.085 C 31.1859 125.205 34.7413 128.825 38.8067 131.795 C 40.9464 133.345 43.228 134.715 45.663 135.815 C 46.8855 136.365 48.1365 136.845 49.4423 137.205 C 50.7381 137.565 52.0849 137.835 53.4836 137.845 L 109.823 137.845 C 111.223 137.845 112.638 137.565 114.022 137.205 C 115.414 136.855 116.796 136.365 118.142 135.815 Z",
	"M 174.588 231.374 C 174.578 235.037 173.127 238.549 170.54 241.14 C 167.952 243.73 164.433 245.185 160.772 245.185 C 157.113 245.185 153.602 243.73 151.01 241.14 C 148.418 238.549 146.959 235.037 146.959 231.374 C 146.959 227.711 148.42 224.199 151.008 221.608 C 153.596 219.018 157.115 217.563 160.775 217.563 C 164.434 217.563 167.945 219.018 170.537 221.608 C 173.129 224.199 174.588 227.711 174.588 231.374 Z",
]

function Cyfra({cyfra, kropka}: {cyfra: string, kropka: boolean}) {
	return <svg
			viewBox="0 0 180 250"
			version="1.1"
			width="180"
			height="250"
			style={{backgroundColor: kolor_tla}}>
		<g>
			{[...segmenty[cyfra], kropka].map((segment, i) => <path
				key={i}
				d={kształty[i]}
				style={segment ? styl_on : styl_off} />
			)}
		</g>
	</svg>
}

export default Cyfra
