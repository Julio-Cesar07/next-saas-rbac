type ErrorHttpProps = {
	message: string;
	statusCode: number;
};

export class ErrorHttp extends Error {
	private props: ErrorHttpProps;
	constructor(props: ErrorHttpProps) {
		super(props.message);
		this.props = props;
	}

	get statusCode() {
		return this.props.statusCode;
	}

	get message() {
		return this.props.message;
	}
}
