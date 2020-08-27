---
layout: post
title: "A Not So Long Introduction to Pydantic"
description: "A blog post on how to use pydantic BaseModel"
date: 2020-08-26
comments: true
feature_image: images/pydantic.jpg
tags: [tech]
---

Due to untyped nature of python, validation of datatypes used in your classes can be quite tricky. Unless used judiciously, this can lead to downstream issues related to use of invalid datatypes in your python package. 

In this post, we explore data validation for python classes using  [pydantic](https://pydantic-docs.helpmanual.io/).

<!--more-->

At its core, pydantic is a data validation and a settings management library. In this post we will focus more on data validation part. Let's start with a basic example. While the [documentation](https://pydantic-docs.helpmanual.io/) is holistic, this blog post can serve as a quick start guide, an extended overview if you insist :blush:.

The code examples presented in this blog post are available in the following [GitHub repository](https://github.com/umesh-timalsina/not-so-long-intro-to-pydantic)
 
Let's create a simple account management problem. We will start with a simple situation with two types of accounts. 

1. `SavingsAccount`
2. `CheckingAccount`

Clearly, many aspects of these accounts can be consolidated using an abstract base class `Account`. Using pydantic, we can define the base class as:

```python
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field


class Account(BaseModel, ABC):
    id: str = Field(
        ...,
        description="The id of the account"
    )

    account_holder: str = Field(
        ...,
        description="The name of the account holder"
    )

    amount: float = Field(
        ...,
        description="The amount in the account in dollars"
    )

    is_open: bool = Field(
        default=True,
        description="A flag indicating whether or not the account is open"
    )

    @abstractmethod
    def deposit(self, amount):
        raise NotImplementedError

    @abstractmethod
    def close(self):
        raise NotImplementedError

    def withdraw(self, amount):
        if self.amount <= amount:
            self.amount -= amount
        else:
            raise ValueError('Cannot withdraw more than available funds.')

    def __repr__(self):
        return f'<{self.__class__.__name__} {self.id}>'

```

Pydantic provides two kinds of classes: `BaseModel` and `dataclass`. Basically, any class you define should inherit from `BaseModel` or `dataclass`. In the example above, we create an abstract base class called `Account`, which has the following fields: `id`, `account_holder`, `amount`, `is_open`. Using type annotations, we have declared that the field `id` should be a string and so forth. Notice the use of `Field` function, `Field` in a pydantic is equivalent to class attributes, for which pydantic provides data type validations and with some customization, runtime type checking. The `...` in `Field` means that the parameter is required during class initialization.

Back to the accounts problem: Let's create `SavingsAccount` and `CheckingAccount` as shown below:

```python
class SavingsAccount(Account):
    def deposit(self, amount):
        self.amount += amount


class CheckingAccount(Account):
    deposit_fee: float = Field(
        default=0.0,
        description="Deposit fee for the checking account"
    )

    def deposit(self, amount):
        if amount < self.deposit_fee:
            raise ValueError('Amount is less than deposit fee')
        self.amount += (amount - self.deposit_fee)

```

Now these classes can be instantiated as:

```python
>>> saving_account_1 = SavingAccount(id='NASHVILLE-CUST-ABX100', account_holder='John Doe', amount=200.0, is_open=True)
>>> saving_account_1.deposit(25)
>>> saving_account_1.amount
225.0
>>> checking_account_1 = CheckingAccount(id='NASHVILLE-CUST-ABY100', account_holder='Jane Doe', amount=200.0, is_open=True, deposit_fee=2.0)
>>> checking_account_1.deposit(25)
>>> checking_account_1.amount
223.0
>>> checking_account_1.close()
```

### Out of the box json serialization and initialization using raw json
We get out of box serialization to JSON format using pydantic, which can be configured. The `parse_raw` method allows us to deserialize and create objects from json string as shown below:

```python
>>> checking_account_1 = CheckingAccount(id='NASHVILLE-CUST-ABY100', account_holder='Jane Doe', amount=200.0, is_open=True, deposit_fee=2.0)
>>> json_str = checking_account_1.json()
>>> json_str
'{"id": "NASHVILLE-CUST-ABY100", "account_holder": "Jane Doe", "amount": 200.0, "is_open": true, "deposit_fee": 2.0}'
>>> checking_account_copy = CheckingAccount.parse_raw(json_str)
```

### Customizing Model Behavior using model Config


