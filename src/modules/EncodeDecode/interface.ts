export type TEncodeDecodeSchema = TEncodeDecodeSchemaItem[];
export type TEncodeDecodeSchemaItem = [number, TEncodeDecodeSchemaType];

export type TEncodeDecodeSchemaType = 'number' | 'string' | 'boolean' | 'ascii';
export type TEncodeDecodeData = number | string | boolean;
