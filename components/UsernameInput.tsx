import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

export interface UsernameInputProps {
    value: string,
    onChange: (val: string) => void,
}
export default function(props: UsernameInputProps) {
    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
                placeholder="username"
                value={props.value}
                onChange={(e) => props.onChange(e.currentTarget.value)}
            />
            <InputGroup.Append>
                <Button type="submit" variant="secondary">View</Button>
            </InputGroup.Append>
        </InputGroup>
    );
}