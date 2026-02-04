# Spaced Repetition Algorithms for Flashcard Programs: A Complete Tutorial

## Introduction

Spaced repetition is a learning technique that leverages the psychological spacing effect to optimize memory retention. Instead of cramming information all at once, spaced repetition schedules reviews at increasing intervals to reinforce memory just before forgetting occurs.

The core principle is based on Hermann Ebbinghaus's **forgetting curve**, which demonstrates that memory retention follows a predictable decay pattern. By reviewing information at strategic moments, we can:

- Improve long-term retention
- Reduce total study time
- Focus effort on difficult material
- Achieve more efficient learning

## Basic Memory Models

### The Forgetting Curve

The forgetting curve describes how quickly we lose information over time without reinforcement. Ebbinghaus found that retention follows an exponential decay:

$$
R(t) = e^{-\frac{t}{S}}
$$

Where:
- $R(t)$ = probability of recall at time $t$
- $t$ = time elapsed since learning
- $S$ = memory stability (how long the memory lasts)

### Two-Component Model of Memory

Modern algorithms often use a two-component model with:

1. **Memory Stability (S)**: How long a memory can last if undisturbed
2. **Memory Retrievability (R)**: The current probability of successful recall

### Three-Component Model of Memory

Advanced systems like FSRS add a third component:

1. **Retrievability (R)**: Probability of recall at any given moment
2. **Stability (S)**: Memory durability over time
3. **Difficulty (D)**: Inherent difficulty of the material

## SM-2 Algorithm: The Foundation

The SM-2 algorithm, developed by Piotr Woźniak in 1987, remains the most widely used spaced repetition algorithm. It's the foundation for systems like Anki (in modified form).

### Core Components

SM-2 tracks three properties for each flashcard:

1. **Repetition number (n)**: Number of successful reviews in a row
2. **Ease Factor (EF)**: Difficulty multiplier (1.1 to 2.5)
3. **Interval (I)**: Days until next review

### The Algorithm

**Input**: User grade $q$ (0-5 scale), current values of $n$, $EF$, and $I$

**Grading Scale**:

- 5: Perfect response
- 4: Correct after hesitation  
- 3: Correct with difficulty
- 2: Incorrect but familiar
- 1: Incorrect but remembered
- 0: Complete blackout

**Algorithm Steps**:

If $q \geq 3$ (correct response):

$$I = \begin{cases}
1 & \text{if } n = 0 \\
6 & \text{if } n = 1 \\
\text{round}(I \times EF) & \text{if } n > 1
\end{cases}$$

Then increment: $n = n + 1$

If $q < 3$ (incorrect response):
$$n = 0, \quad I = 1$$

**Ease Factor Update** (applied regardless of correctness):

$$EF_{new} = EF + 0.1 - (5-q) \times (0.08 + (5-q) \times 0.02)$$

With constraints: $EF_{new} \geq 1.3$

### SM-2 Advantages and Limitations

**Advantages**:

- Simple and robust
- Well-tested over decades
- Resistant to data corruption
- Easy to implement

**Limitations**:

- Fixed interval progression
- Doesn't account for review timing variations
- Limited adaptability to individual differences
- No consideration for item similarity

## FSRS Algorithm: Modern Approach

The Free Spaced Repetition Scheduler (FSRS) represents a modern approach based on the three-component model of memory.

### Core Concepts

FSRS uses machine learning to predict optimal review timing based on:

$$
P(\text{recall}) = e^{\frac{\ln(R)}{S} \times t}
$$

Where:
- $R$ = current retrievability
- $S$ = memory stability  
- $t$ = time since last review

### Memory State Updates

When a card is reviewed, FSRS updates the three components:

**Stability Update**:
$$S_{new} = S \times (1 + f(D, S, R, G))$$

**Retrievability Update**:
$$R_{new} = e^{\frac{\ln(0.9) \times t}{S}}$$

**Difficulty Update**:
$$D_{new} = D + w \times (G - 3)$$

Where:
- $G$ = grade given by user (1-4 scale)
- $w$ = weight parameter learned from data
- $f(D, S, R, G)$ = stability increase function

### Interval Calculation

The next review interval is calculated to achieve target retrievability (typically 90%):

$$
I = S \times \ln\left(\frac{R_{target}}{R_{current}}\right) / \ln(R_{target})
$$

## SuperMemo SM-17/SM-18: Advanced Algorithms

The latest SuperMemo algorithms represent the cutting edge of spaced repetition research.

### Three-Component Definitions

**Memory Stability (S)**:
$$
S = \text{interval where } P(\text{recall}) = 0.9
$$

**Memory Retrievability (R)**:
$$R(t) = e^{-\frac{t \ln(0.9)}{S}}$$

**Item Difficulty (D)**:
$$D = \frac{S_{increase}}{S_{max}} \text{ (normalized to 0-1)}$$

### Stability Increase Function

The heart of SM-17/18 is the stability increase function:

$$
\text{SInc}(D, S, R, G) = w_1 \times D^{w_2} \times S^{w_3} \times e^{w_4 \times (1-R)} \times G^{w_5}
$$

Where $w_1$ through $w_5$ are parameters optimized from user data.

### Optimization Process

SM-17/18 continuously optimizes parameters using:

$$
\min \sum_{i=1}^{n} (G_i - \hat{G_i})^2
$$

Where $G_i$ is the actual grade and $\hat{G_i}$ is the predicted grade based on retrievability.

## Implementation Considerations

### Algorithm Selection

**Choose SM-2 when**:
- Building a simple system
- Limited computational resources
- Need proven stability
- Open-source requirements

**Choose FSRS when**:
- Want modern performance
- Can collect user data
- Need better delay handling
- Optimize for efficiency

**Choose SM-17/18 when**:
- Maximum sophistication required
- Large dataset available
- Advanced features needed
- Commercial application

### Data Storage Requirements

**SM-2 per card**:
- Repetition count (integer)
- Ease factor (float)
- Last interval (integer)
- Due date (timestamp)

**FSRS per card**:
- Stability (float)
- Retrievability (float) 
- Difficulty (float)
- Review history (for optimization)

### Performance Metrics

**Log Loss** (primary metric for probabilistic algorithms):

$$
\text{LogLoss} = -\frac{1}{N}\sum_{i=1}^{N}[y_i \ln(p_i) + (1-y_i)\ln(1-p_i)]
$$

Where:
- $y_i$ = actual outcome (0 or 1)
- $p_i$ = predicted probability
- $N$ = number of predictions

**Calibration** measures how well predicted probabilities match actual outcomes.

## Advanced Topics

### Interval Scheduling with Delays

When reviews are delayed, algorithms must account for extra forgetting:

**FSRS Delay Handling**:
$$
R_{delayed} = R \times e^{\frac{-\text{delay}}{S \times \ln(0.9)}}
$$

**SM-17 Delay Compensation**:
Uses retrievability calculation to determine new stability after delayed review.

### Batch Optimization

For systems with large datasets, parameters can be optimized using gradient descent:

$$
\theta_{new} = \theta_{old} - \alpha \nabla_\theta L(\theta)
$$

Where $L(\theta)$ is the loss function (typically log loss) and $\alpha$ is the learning rate.

### Memory Interference

Advanced algorithms account for interference between similar items:

$$
S_{effective} = S \times (1 - \text{interference\_factor})
$$

## Practical Implementation Tips

### Starting Parameters

**SM-2 defaults**:
- Initial ease factor: 2.5
- First interval: 1 day
- Second interval: 6 days

**FSRS initialization**:
- Use pre-trained weights from research
- Adapt parameters after collecting ~1000 reviews
- Implement fallback to SM-2 for new users

### User Interface Integration

**Grade Mapping**:
Map user-friendly buttons to algorithm grades:
- "Again" → 1 (FSRS) or 0-2 (SM-2)
- "Hard" → 2 (FSRS) or 3 (SM-2)  
- "Good" → 3 (FSRS) or 4 (SM-2)
- "Easy" → 4 (FSRS) or 5 (SM-2)

### Quality Assurance

Implement bounds checking:

$$1 \leq I \leq I_{max}$$
$$EF_{min} \leq EF \leq EF_{max}$$
$$0 \leq R \leq 1$$

## Conclusion

Spaced repetition algorithms have evolved significantly since the original SM-2. While SM-2 remains reliable and widely used, modern approaches like FSRS offer improved efficiency and adaptability. The choice of algorithm should balance complexity, performance requirements, and implementation constraints.

Key takeaways:

1. **SM-2** provides a solid foundation with proven reliability
2. **FSRS** offers modern efficiency with machine learning optimization  
3. **SM-17/18** represents the current state-of-the-art for advanced applications
4. **Implementation details** often matter more than algorithm choice
5. **Continuous optimization** from user data improves all approaches

The future of spaced repetition lies in personalized algorithms that adapt to individual learning patterns while maintaining the core principle of strategic timing for optimal memory consolidation.